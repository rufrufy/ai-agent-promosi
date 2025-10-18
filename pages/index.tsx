import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/home');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>AI Agent Promosi BKPP</title>
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <nav className="bg-white border-b border-gray-200 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
                AI
              </div>
              <span className="font-bold text-gray-800">Agent Promosi BKPP</span>
            </div>
            <div className="flex gap-3">
              <Link href="/auth/login" className="px-4 py-2 text-gray-700 hover:text-blue-600">
                Masuk
              </Link>
              <Link href="/auth/register" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Daftar
              </Link>
            </div>
          </div>
        </nav>
        
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Sistem Promosi <span className="text-blue-600">AI</span> untuk BKPP
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Platform cerdas berbasis AI yang membantu BKPP dalam proses evaluasi dan rekomendasi promosi pegawai dengan akurasi tinggi dan transparansi penuh.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/register" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
              Mulai Sekarang
            </Link>
            <Link href="/about" className="px-8 py-4 bg-white text-gray-700 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50">
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
