import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { supabase, JobListing } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';

const Jobs: React.FC = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  // Fetch jobs from Supabase
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply filters
      if (selectedInstitution) {
        query = query.ilike('institution', `%${selectedInstitution}%`);
      }
      if (selectedPosition) {
        query = query.ilike('title', `%${selectedPosition}%`);
      }
      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,institution.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching jobs:', error);
        return;
      }

      setJobs(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch when filters change
  useEffect(() => {
    fetchJobs();
  }, [searchTerm, selectedInstitution, selectedPosition]);

  const applyToJob = async (jobId: string) => {
    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert('Please login to apply for this job');
        return;
      }

      // Insert application
      const { error } = await supabase
        .from('job_applications')
        .insert([
          {
            job_id: jobId,
            user_id: user.id,
            status: 'pending'
          }
        ]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          alert('You have already applied for this job');
        } else {
          console.error('Error applying for job:', error);
          alert('Error applying for job');
        }
        return;
      }

      // Update applicants count
      const currentJob = jobs.find(job => job.id === jobId);
      if (currentJob) {
        const { error: updateError } = await supabase
          .from('jobs')
          .update({ applicants: currentJob.applicants + 1 })
          .eq('id', jobId);

        if (updateError) {
          console.error('Error updating applicants count:', updateError);
        }
      }

      alert('Application submitted successfully!');
      fetchJobs(); // Refresh jobs list
    } catch (error) {
      console.error('Error:', error);
      alert('Error applying for job');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'hot':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">Hot</span>;
      case 'active':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Aktif</span>;
      case 'closing':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Closing</span>;
      default:
        return null;
    }
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return 'Expired';
    } else if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Tomorrow';
    } else {
      return `${diffDays} days left`;
    }
  };

  // Loading state for authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Lowongan Pekerjaan - AI Agent Promosi BKPP</title>
        <meta name="description" content="Temukan lowongan pekerjaan terbaru di instansi pemerintah dengan sistem AI Agent Promosi BKPP" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <Layout>
        {/* Search Bar for Mobile */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 md:hidden">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Cari lowongan, instansi, lokasi..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-100 rounded-md px-4 py-2 pl-10 text-sm focus:outline-none focus:bg-white focus:shadow-sm"
            />
            <svg className="w-4 h-4 absolute left-3 top-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Main Container */}
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Left Sidebar - Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">PENCARIAN</h3>
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden p-2 rounded-md border border-gray-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4V13.414a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z" />
                    </svg>
                  </button>
                </div>
                
                <div className={`space-y-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                  {/* Search by Institution */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Instansi</label>
                    <input
                      type="text"
                      placeholder="Pencarian Instansi"
                      value={selectedInstitution}
                      onChange={(e) => setSelectedInstitution(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Search by Position */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Jabatan</label>
                    <input
                      type="text"
                      placeholder="Masukkan Nama Jabatan"
                      value={selectedPosition}
                      onChange={(e) => setSelectedPosition(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedInstitution('');
                        setSelectedPosition('');
                      }}
                      className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-md text-sm font-medium hover:bg-gray-600 transition-colors"
                    >
                      Reset
                    </button>
                    <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors">
                      Cari
                    </button>
                  </div>

                  {/* Quick Stats */}
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Statistik</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Total Lowongan</span>
                        <span className="text-blue-600 font-medium">{jobs.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hot Jobs</span>
                        <span className="text-red-600 font-medium">{jobs.filter(job => job.status === 'hot').length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Closing Soon</span>
                        <span className="text-yellow-600 font-medium">{jobs.filter(job => job.status === 'closing').length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content - Job Listings */}
            <div className="lg:col-span-3">
              {/* Header */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Lowongan Pekerjaan</h1>
                    <p className="text-gray-600">Temukan peluang karir terbaik di instansi pemerintah</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8" />
                    </svg>
                    <span className="text-lg font-semibold text-blue-600">{jobs.length} Lowongan</span>
                  </div>
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading jobs...</p>
                </div>
              )}

              {/* Job Cards */}
              {!loading && (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div key={job.id} className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                      <div className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            {/* Institution Logo */}
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                              {job.logo_url ? (
                                <img src={job.logo_url} alt={job.institution} className="w-12 h-12 rounded-lg object-cover" />
                              ) : (
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                  </svg>
                                </div>
                              )}
                            </div>

                            {/* Job Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="text-xl font-bold text-gray-800 mb-1">{job.title}</h3>
                                  <div className="flex items-center gap-2 text-sm text-red-600 mb-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <span>{job.institution}</span>
                                  </div>
                                </div>
                                {getStatusBadge(job.status)}
                              </div>

                              {/* Job Requirements Grid */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                                <div className="flex items-center gap-2">
                                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                                    Minimal: {job.education}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                                    Pengalaman: {job.experience}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded">
                                    Kebutuhan: 1
                                  </span>
                                </div>
                              </div>

                              {/* Location and other details */}
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                                <div className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  <span>{job.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                  </svg>
                                  <span>{job.salary}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span>{formatDeadline(job.deadline)}</span>
                                </div>
                              </div>

                              {/* Description */}
                              <p className="text-gray-700 text-sm mb-4 line-clamp-2">{job.description}</p>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="flex flex-col items-end gap-2">
                            <button 
                              onClick={() => applyToJob(job.id)}
                              className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                            >
                              Apply Now
                            </button>
                            <span className="text-xs text-gray-500">{job.applicants} pelamar</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {jobs.length === 0 && !loading && (
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8" />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Tidak ada lowongan ditemukan</h3>
                      <p className="text-gray-600">Coba ubah kriteria pencarian Anda atau hapus beberapa filter.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Jobs;