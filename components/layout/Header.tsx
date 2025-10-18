import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'

interface HeaderProps {
  showSearch?: boolean
  searchTerm?: string
  onSearchChange?: (term: string) => void
  searchPlaceholder?: string
}

const Header: React.FC<HeaderProps> = ({ 
  showSearch = false, 
  searchTerm = '', 
  onSearchChange,
  searchPlaceholder = "Search for anything"
}) => {
  const { user, profile, signOut } = useAuth()
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const isActive = (path: string) => router.pathname === path

  return (
    <div className="navbar bg-white shadow-md border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between max-w-7xl">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Link href={user ? "/home" : "/"} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
              AI
            </div>
            <span className="hidden md:block font-semibold text-gray-800">Agent Promosi</span>
          </Link>
          
          {showSearch && (
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="bg-gray-100 rounded-md px-4 py-2 pl-10 w-64 text-sm focus:outline-none focus:bg-white focus:shadow-sm"
              />
              <svg className="w-4 h-4 absolute left-3 top-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          )}
        </div>

        {/* Center Navigation - Only show when logged in */}
        {user && (
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/home" className={`flex flex-col items-center gap-1 ${isActive('/home') ? 'text-blue-600 border-b-2 border-blue-600 pb-2' : 'text-gray-500 hover:text-gray-700'}`}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              <span className="text-xs font-medium">Home</span>
            </Link>
            
            <Link href="/network" className={`flex flex-col items-center gap-1 ${isActive('/network') ? 'text-blue-600 border-b-2 border-blue-600 pb-2' : 'text-gray-500 hover:text-gray-700'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-xs font-medium">My Network</span>
            </Link>
            
            <Link href="/jobs" className={`flex flex-col items-center gap-1 ${isActive('/jobs') ? 'text-blue-600 border-b-2 border-blue-600 pb-2' : 'text-gray-500 hover:text-gray-700'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8" />
              </svg>
              <span className="text-xs font-medium">Jobs</span>
            </Link>
            
            <Link href="/chat" className={`flex flex-col items-center gap-1 ${isActive('/chat') ? 'text-blue-600 border-b-2 border-blue-600 pb-2' : 'text-gray-500 hover:text-gray-700'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-xs font-medium">Messaging</span>
            </Link>

            {/* Admin Only Menu */}
            {profile?.role === 'admin' && (
              <Link href="/admin" className={`flex flex-col items-center gap-1 ${isActive('/admin') ? 'text-blue-600 border-b-2 border-blue-600 pb-2' : 'text-gray-500 hover:text-gray-700'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-xs font-medium">Admin</span>
              </Link>
            )}
            
            <Link href="/about" className={`flex flex-col items-center gap-1 ${isActive('/about') ? 'text-blue-600 border-b-2 border-blue-600 pb-2' : 'text-gray-500 hover:text-gray-700'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-medium">About</span>
            </Link>
          </nav>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {user ? (
            // Logged in user
            <div className="relative">
              <button 
                className="flex items-center gap-2 hover:bg-gray-100 rounded-md p-2"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {profile?.full_name ? getInitials(profile.full_name) : 'U'}
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-gray-800">
                    {profile?.full_name || 'User'}
                  </div>
                  <div className="text-xs text-gray-600 capitalize">
                    {profile?.role || 'Member'}
                  </div>
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
                        {profile?.full_name ? getInitials(profile.full_name) : 'U'}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{profile?.full_name || 'User'}</h3>
                        <p className="text-sm text-gray-600 capitalize">{profile?.role || 'Member'} at BKPP</p>
                      </div>
                    </div>
                    <Link href="/profile" className="text-sm text-blue-600 hover:underline">
                      View Profile
                    </Link>
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
                    <button 
                      onClick={handleSignOut}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 w-full text-left"
                    >
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="text-sm">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Not logged in
            <div className="flex items-center gap-2">
              <Link 
                href="/auth/login" 
                className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                Login
              </Link>
              <Link 
                href="/auth/register" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header