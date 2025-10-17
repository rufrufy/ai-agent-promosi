import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

const About: React.FC = () => {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    return (
        <>
            <Head>
                <title>Tentang Kami - AI Agent Promosi BKPP</title>
                <meta name="description" content="Platform AI untuk sistem promosi pegawai BKPP dengan teknologi terdepan" />
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
                                    placeholder="Search for anything" 
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
                            <Link href="/jobs" className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-700">
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
                            <Link href="/about" className="flex flex-col items-center gap-1 text-blue-600 border-b-2 border-blue-600 pb-2">
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

                {/* Main Content */}
                <div className="container mx-auto px-4 py-6 max-w-7xl">
                    {/* Hero Section */}
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-6">
                        <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                        <div className="px-8 pb-8 -mt-16">
                            <div className="flex flex-col lg:flex-row items-start lg:items-end gap-6">
                                <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-4xl border-6 border-white shadow-lg">
                                    AI
                                </div>
                                <div className="flex-1">
                                    <h1 className="text-4xl font-bold text-gray-800 mb-2">AI Agent Promosi BKPP</h1>
                                    <p className="text-xl text-gray-600 mb-4">
                                        Platform AI untuk sistem promosi pegawai dengan teknologi terdepan
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">#AI</span>
                                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">#BKPP</span>
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">#Promosi</span>
                                        <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">#Innovation</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Mission Card */}
                            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800">Misi Kami</h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    Mendemokratisasi akses ke teknologi AI untuk sistem promosi pegawai yang objektif dan efisien. 
                                    Kami berkomitmen untuk menciptakan platform yang membantu BKPP dalam proses evaluasi dan 
                                    rekomendasi promosi dengan tingkat akurasi tinggi dan transparansi penuh.
                                </p>
                            </div>

                            {/* What We Do Card */}
                            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800">Apa yang Kami Lakukan</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800 mb-1">Analisis Data AI</h3>
                                            <p className="text-sm text-gray-600">Evaluasi objektif dengan algoritma machine learning</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800 mb-1">Optimisasi Proses</h3>
                                            <p className="text-sm text-gray-600">Otomasi workflow promosi pegawai</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800 mb-1">Rekomendasi Cerdas</h3>
                                            <p className="text-sm text-gray-600">Saran promosi berdasarkan performa & kriteria</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 bg-pink-50 rounded-lg">
                                        <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 13v-1a4 4 0 014-4 4 4 0 014 4v1m0 0h3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2h3m0 0V9a2 2 0 012-2h0a2 2 0 012 2v4.01" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800 mb-1">Transparansi</h3>
                                            <p className="text-sm text-gray-600">Dashboard analytics dan laporan real-time</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Stats Card */}
                            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                                <h3 className="font-bold text-gray-800 mb-4">Performance Stats</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Akurasi AI</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-2 bg-gray-200 rounded-full">
                                                <div className="w-15 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                                            </div>
                                            <span className="text-green-600 font-bold text-sm">94%</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Efficiency</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-2 bg-gray-200 rounded-full">
                                                <div className="w-14 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                                            </div>
                                            <span className="text-purple-600 font-bold text-sm">87%</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">User Satisfaction</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-2 bg-gray-200 rounded-full">
                                                <div className="w-15 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                                            </div>
                                            <span className="text-blue-600 font-bold text-sm">92%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Card */}
                            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-gray-800">Hubungi Kami</h3>
                                </div>
                                <p className="text-gray-600 text-sm mb-4">
                                    Siap mentransformasi strategi promosi pegawai Anda? Hubungi tim kami untuk mengetahui lebih lanjut.
                                </p>
                                <Link href="/chat" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    Chat dengan AI
                                </Link>
                            </div>

                            {/* Technology Card */}
                            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                                <h3 className="font-bold text-gray-800 mb-4">Teknologi</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <span className="text-blue-600 font-bold text-xs">AI</span>
                                        </div>
                                        <span className="text-sm text-gray-700">Machine Learning</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                            <span className="text-green-600 font-bold text-xs">NL</span>
                                        </div>
                                        <span className="text-sm text-gray-700">Natural Language Processing</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <span className="text-purple-600 font-bold text-xs">DA</span>
                                        </div>
                                        <span className="text-sm text-gray-700">Data Analytics</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                                            <span className="text-pink-600 font-bold text-xs">AP</span>
                                        </div>
                                        <span className="text-sm text-gray-700">API Integration</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;