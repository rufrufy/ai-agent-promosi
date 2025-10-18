import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

interface JobListing {
  id: string;
  title: string;
  institution: string;
  institutionType: string;
  location: string;
  education: string;
  experience: string;
  salary: string;
  deadline: string;
  applicants: number;
  status: 'hot' | 'active' | 'closing';
  description: string;
  requirements: string[];
  logo?: string;
}

const Jobs: React.FC = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Sample job data based on the image
  const jobListings: JobListing[] = [
    {
      id: '1',
      title: 'SEKRETARIS DAERAH',
      institution: 'Pemerintah Kab. Merangin',
      institutionType: 'Pemerintah Daerah',
      location: 'Merangin, Jambi',
      education: 'S-1/Sarjana',
      experience: 'Minimal 60 bulan',
      salary: 'Rp. 0',
      deadline: '7 Jam Yang Lalu',
      applicants: 1,
      status: 'hot',
      description: 'Mengkoordinasikan seluruh kegiatan pemerintahan daerah dan bertanggung jawab kepada Bupati.',
      requirements: [
        'Pendidikan minimal S1 dari perguruan tinggi terakreditasi',
        'Pengalaman kerja minimal 5 tahun di bidang pemerintahan',
        'Memiliki kemampuan kepemimpinan yang baik',
        'Menguasai teknologi informasi'
      ]
    },
    {
      id: '2',
      title: 'Kepala Dinas Kesehatan',
      institution: 'Pemerintah Kota Padang Panjang',
      institutionType: 'Pemerintah Daerah',
      location: 'Padang Panjang, Sumatera Barat',
      education: 'Diploma IV',
      experience: 'Minimal 60 bulan',
      salary: 'Rp. 2.025.000',
      deadline: '7 Jam Yang Lalu',
      applicants: 1,
      status: 'hot',
      description: 'Memimpin dan mengelola seluruh kegiatan dinas kesehatan di wilayah Kota Padang Panjang.',
      requirements: [
        'Pendidikan minimal D-IV Kesehatan',
        'Pengalaman kerja minimal 5 tahun di bidang kesehatan',
        'Memiliki sertifikat keahlian di bidang kesehatan',
        'Kemampuan manajerial yang baik'
      ]
    },
    {
      id: '3',
      title: 'Inspektur',
      institution: 'Pemerintah Kota Padang Panjang',
      institutionType: 'Pemerintah Daerah',
      location: 'Padang Panjang, Sumatera Barat',
      education: 'Diploma IV',
      experience: 'Minimal 60 bulan',
      salary: 'Rp. 2.025.000',
      deadline: '8 Jam Yang Lalu',
      applicants: 1,
      status: 'hot',
      description: 'Melaksanakan pengawasan terhadap penyelenggaraan pemerintahan daerah.',
      requirements: [
        'Pendidikan minimal D-IV dalam bidang terkait',
        'Pengalaman kerja minimal 5 tahun',
        'Memiliki integritas tinggi',
        'Kemampuan analisis yang baik'
      ]
    },
    {
      id: '4',
      title: 'DIREKTUR PENYELIDIKAN',
      institution: 'Komisi Pemberantasan Korupsi',
      institutionType: 'Lembaga Negara',
      location: 'Jakarta Pusat',
      education: 'S-1/Sarjana',
      experience: 'Minimal 56 bulan',
      salary: 'Rp. 0',
      deadline: '10 Jam Yang Lalu',
      applicants: 1,
      status: 'active',
      description: 'Memimpin direktorat penyelidikan dalam upaya pemberantasan korupsi.',
      requirements: [
        'Pendidikan minimal S1 Hukum/Kriminologi',
        'Pengalaman kerja minimal 5 tahun di bidang hukum/penegakan hukum',
        'Memiliki integritas moral yang tinggi',
        'Kemampuan investigasi yang baik'
      ]
    },
    {
      id: '5',
      title: 'DIREKTUR KOORDINASI DAN SUPERVISI WILAYAH V',
      institution: 'Komisi Pemberantasan Korupsi',
      institutionType: 'Lembaga Negara',
      location: 'Jakarta Pusat',
      education: 'S-1/Sarjana',
      experience: 'Minimal 56 bulan',
      salary: 'Rp. 0',
      deadline: '10 Jam Yang Lalu',
      applicants: 1,
      status: 'active',
      description: 'Mengkoordinasikan dan mensupervisi kegiatan KPK di Wilayah V.',
      requirements: [
        'Pendidikan minimal S1 dari jurusan terkait',
        'Pengalaman kerja minimal 5 tahun',
        'Kemampuan koordinasi dan supervisi yang baik',
        'Memahami sistem pemerintahan daerah'
      ]
    },
    {
      id: '6',
      title: 'DIREKTUR PENUNTUTAN',
      institution: 'Komisi Pemberantasan Korupsi',
      institutionType: 'Lembaga Negara',
      location: 'Jakarta Pusat',
      education: 'S-1/Sarjana',
      experience: 'Minimal 56 bulan',
      salary: 'Rp. 0',
      deadline: '10 Jam Yang Lalu',
      applicants: 1,
      status: 'active',
      description: 'Memimpin direktorat penuntutan dalam proses penegakan hukum tindak pidana korupsi.',
      requirements: [
        'Pendidikan minimal S1 Hukum',
        'Pengalaman kerja minimal 5 tahun di bidang hukum pidana',
        'Memiliki sertifikat profesi jaksa/pengacara',
        'Kemampuan litigasi yang baik'
      ]
    },
    {
      id: '7',
      title: 'DIREKTUR DETEKSI DAN ANALISIS KORUPSI',
      institution: 'Komisi Pemberantasan Korupsi',
      institutionType: 'Lembaga Negara',
      location: 'Jakarta Pusat',
      education: 'S-1/Sarjana',
      experience: 'Minimal 56 bulan',
      salary: 'Rp. 0',
      deadline: '10 Jam Yang Lalu',
      applicants: 1,
      status: 'closing',
      description: 'Memimpin kegiatan deteksi dan analisis potensi tindak pidana korupsi.',
      requirements: [
        'Pendidikan minimal S1 bidang terkait',
        'Pengalaman kerja minimal 5 tahun',
        'Kemampuan analisis data yang baik',
        'Memahami sistem deteksi korupsi'
      ]
    },
    {
      id: '8',
      title: 'KEPALA BIRO HUKUM',
      institution: 'Komisi Pemberantasan Korupsi',
      institutionType: 'Lembaga Negara',
      location: 'Jakarta Pusat',
      education: 'S-1/Sarjana',
      experience: 'Minimal 56 bulan',
      salary: 'Rp. 0',
      deadline: '10 Jam Yang Lalu',
      applicants: 1,
      status: 'closing',
      description: 'Mengelola dan mengkoordinasikan seluruh aspek legal dan hukum di KPK.',
      requirements: [
        'Pendidikan minimal S1 Hukum',
        'Pengalaman kerja minimal 5 tahun di bidang hukum',
        'Memiliki sertifikat profesi hukum',
        'Kemampuan manajerial hukum yang baik'
      ]
    }
  ];

  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesInstitution = selectedInstitution === '' || job.institution === selectedInstitution;
    const matchesPosition = selectedPosition === '' || job.title === selectedPosition;
    
    return matchesSearch && matchesInstitution && matchesPosition;
  });

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

  const institutions = [...new Set(jobListings.map(job => job.institution))];
  const positions = [...new Set(jobListings.map(job => job.title))];

  return (
    <>
      <Head>
        <title>Lowongan Pekerjaan - AI Agent Promosi BKPP</title>
        <meta name="description" content="Temukan lowongan pekerjaan terbaru di instansi pemerintah dengan sistem AI Agent Promosi BKPP" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="min-h-screen bg-gray-100" data-theme="light">
        {/* Header */}
        <div className="navbar bg-white shadow-md border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
          <div className="container mx-auto flex items-center justify-between max-w-7xl">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
                  AI
                </div>
                <span className="hidden md:block font-semibold text-gray-800">Agent Promosi</span>
              </Link>
              <div className="relative hidden md:block">
                <input 
                  type="text" 
                  placeholder="Cari lowongan, instansi, lokasi..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-100 rounded-md px-4 py-2 pl-10 w-64 text-sm focus:outline-none focus:bg-white focus:shadow-sm"
                />
                <svg className="w-4 h-4 absolute left-3 top-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Center Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
                <span className="text-xs font-medium">Home</span>
              </Link>
              <Link href="/network" className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-xs font-medium">My Network</span>
              </Link>
              <Link href="/jobs" className="flex flex-col items-center gap-1 text-blue-600 border-b-2 border-blue-600 pb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8" />
                </svg>
                <span className="text-xs font-medium">Jobs</span>
              </Link>
              <Link href="/chat" className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-xs font-medium">Messaging</span>
              </Link>
              <Link href="/about" className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-medium">About</span>
              </Link>
            </nav>

            {/* Right Section */}
            <div className="flex items-center">
              <div className="relative">
                <button 
                  className="flex items-center gap-2 hover:bg-gray-100 rounded-md p-2"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    JD
                  </div>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          JD
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">John Doe</h3>
                          <p className="text-sm text-gray-600">Data Analyst at BKPP</p>
                        </div>
                      </div>
                      <Link href="/profile" className="text-sm text-blue-600 hover:underline">View Profile</Link>
                    </div>
                    <div className="py-1">
                      <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm">Settings & Privacy</span>
                      </a>
                      <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm">Help & Support</span>
                      </a>
                      <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="text-sm">Sign Out</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
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
                        <span className="text-blue-600 font-medium">{jobListings.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hot Jobs</span>
                        <span className="text-red-600 font-medium">{jobListings.filter(job => job.status === 'hot').length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Closing Soon</span>
                        <span className="text-yellow-600 font-medium">{jobListings.filter(job => job.status === 'closing').length}</span>
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
                    <span className="text-lg font-semibold text-blue-600">{filteredJobs.length} Lowongan</span>
                  </div>
                </div>
              </div>

              {/* Mobile Search */}
              <div className="lg:hidden mb-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Cari lowongan, instansi, lokasi..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white rounded-lg px-4 py-3 pl-10 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <svg className="w-5 h-5 absolute left-3 top-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Job Cards */}
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          {/* Institution Logo */}
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
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
                                  Usia Maksimal: {job.experience}
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
                                <span>{job.deadline}</span>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-700 text-sm mb-4 line-clamp-2">{job.description}</p>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex flex-col items-end gap-2">
                          <button className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
                            Lihat
                          </button>
                          <span className="text-xs text-gray-500">{job.applicants} pelamar</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredJobs.length === 0 && (
                  <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Tidak ada lowongan ditemukan</h3>
                    <p className="text-gray-600">Coba ubah kriteria pencarian Anda atau hapus beberapa filter.</p>
                  </div>
                )}
              </div>

              {/* Pagination - Optional */}
              {filteredJobs.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">1</button>
                    <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">2</button>
                    <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">3</button>
                    <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;