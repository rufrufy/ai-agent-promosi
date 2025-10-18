import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'
import Layout from '../components/layout/Layout'

// Chat interfaces and components
interface Message {
  role: 'user' | 'bot'
  text: string
}

interface ApiResponse {
  ok: boolean
  text: string
}

const ChatBubble = ({ role, text }: { role: 'user' | 'bot'; text: string }) => {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        role === 'user' 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-100 text-gray-800'
      }`}>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  )
}

// Send to N8N function
const sendToN8n = async (text: string): Promise<ApiResponse> => {
  try {
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK
    if (!webhookUrl) {
      return { ok: false, text: 'Webhook URL tidak dikonfigurasi' }
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: text }),
    })

    if (response.ok) {
      const data = await response.json()
      return { ok: true, text: data.output || data.message || 'Pesan berhasil dikirim' }
    } else {
      return { ok: false, text: 'Gagal mengirim pesan ke n8n' }
    }
  } catch (error) {
    return { ok: false, text: 'Terjadi kesalahan koneksi' }
  }
}

export default function Home() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const [showMoreActivity, setShowMoreActivity] = useState(false)
  
  // Chat bubble states
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  // Redirect to landing page if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || chatLoading) return
    
    setInput('')
    setMessages((m: Message[]) => [...m, { role: 'user', text }])
    setChatLoading(true)

    const res = await sendToN8n(text)

    setMessages((m: Message[]) => [
      ...m,
      { role: 'bot', text: res.text },
    ])
    setChatLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect
  }

  return (
    <>
      <Head>
        <title>Home - AI Agent Promosi BKPP</title>
        <meta name="description" content="Dashboard AI Agent Promosi BKPP" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <Layout>
        {/* Main Container */}
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Left Sidebar */}
            <div className="lg:col-span-1">
              {/* Profile Card */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-4">
                <div className="h-16 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <div className="px-4 pb-4 -mt-8">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl border-4 border-white">
                      {profile?.full_name ? profile.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) : 'U'}
                    </div>
                    <h3 className="font-semibold text-gray-800 mt-2">{profile?.full_name || 'User'}</h3>
                    <p className="text-sm text-gray-600 text-center capitalize">{profile?.role || 'Member'} at BKPP | AI Enthusiast</p>
                  </div>
                  <hr className="my-3" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Profile views</span>
                      <span className="text-blue-600 font-medium">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Post views</span>
                      <span className="text-blue-600 font-medium">128</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Connections</span>
                      <span className="text-blue-600 font-medium">108</span>
                    </div>
                  </div>
                  <hr className="my-3" />
                  <div className="space-y-2">
                    <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                      </svg>
                      My Items
                    </a>
                    {profile?.role === 'admin' && (
                      <Link href="/admin" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        Admin Panel
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className={`bg-white rounded-lg shadow-md border border-gray-200 p-4 transition-all duration-300 ${showMoreActivity ? 'h-auto' : 'max-h-64 overflow-hidden'}`}>
                <h4 className="font-semibold text-gray-800 mb-3 text-sm">RECENT</h4>
                <div className="space-y-2">
                  <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                    Data Analysis
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                    Employee Promotion
                  </a>
                  <Link href="/jobs" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                    Job Opportunities
                  </Link>
                  <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                    AI Analytics
                  </a>
                </div>

                <h4 className="font-semibold text-gray-800 mb-3 text-sm mt-4">GROUPS</h4>
                <div className="space-y-2">
                  <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                    <div className="w-4 h-4 bg-blue-300 rounded"></div>
                    Data Analyst Group
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                    <div className="w-4 h-4 bg-blue-300 rounded"></div>
                    BKPP Community
                  </a>
                </div>
                
                <button 
                  onClick={() => setShowMoreActivity(!showMoreActivity)}
                  className="w-full mt-3 text-sm text-gray-600 hover:text-gray-800 text-center py-2"
                >
                  {showMoreActivity ? 'Show less' : 'Show more'} <span className="font-bold">{showMoreActivity ? '-' : '+'}</span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Create Post */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {profile?.full_name ? profile.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) : 'U'}
                  </div>
                  <textarea 
                    className="flex-1 bg-gray-50 rounded-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-blue-500 resize-none" 
                    rows={1} 
                    placeholder="Start a post..."
                  ></textarea>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                      </svg>
                      <span className="text-sm font-medium">Photo</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-green-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                      </svg>
                      <span className="text-sm font-medium">Video</span>
                    </button>
                    <Link href="/chat" className="flex items-center gap-2 text-gray-600 hover:text-purple-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="text-sm font-medium">AI Chat</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Feed Posts */}
              <div className="space-y-4">
                {/* Welcome Post */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      AI
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">AI Agent Promosi BKPP</h3>
                      <p className="text-sm text-gray-600">System Administrator</p>
                      <p className="text-xs text-gray-500">Welcome message</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Selamat datang di AI Agent Promosi BKPP, {profile?.full_name}! 🎉
                    <br /><br />
                    Sebagai <span className="font-semibold capitalize">{profile?.role}</span>, Anda memiliki akses ke:
                    <br />• Dashboard analytics dan insights
                    <br />• Sistem rekomendasi promosi berbasis AI
                    <br />• Networking dengan sesama pegawai BKPP
                    <br />• Chat dengan AI Assistant untuk bantuan
                    {profile?.role === 'admin' && (
                      <>
                        <br />• Panel admin untuk mengelola sistem
                        <br />• Analytics mendalam dan reporting
                      </>
                    )}
                  </p>
                  <div className="flex items-center justify-between border-t pt-3">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        <span className="text-sm">Like</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-green-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="text-sm">Comment</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              {/* Quick Links */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-4">
                <h4 className="font-semibold text-gray-800 mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Link href="/jobs" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Browse Jobs</span>
                  </Link>
                  
                  <Link href="/chat" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">AI Assistant</span>
                  </Link>
                  
                  {profile?.role === 'admin' && (
                    <Link href="/admin" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50">
                      <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium">Admin Panel</span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-800 mb-3">System Stats</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">AI Accuracy</span>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-2 bg-gray-200 rounded-full">
                        <div className="w-11 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-green-600 font-bold text-sm">94%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Active Jobs</span>
                    <span className="text-blue-600 font-bold text-sm">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Users Online</span>
                    <span className="text-green-600 font-bold text-sm">42</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Chat Bubble Widget */}
        <div className="fixed bottom-6 right-6 z-50">
          {/* Chat Window */}
          {isChatOpen && (
            <div className="mb-4 w-96 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white rounded-t-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold text-sm">
                    AI
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Agent Promosi BKPP</h3>
                    <p className="text-xs opacity-90">Online now</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Chat Messages */}
              <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">Hi! 👋</p>
                    <p className="text-xs mt-1">Saya AI Agent Promosi BKPP.<br/>Tanya apa saja tentang sistem promosi!</p>
                  </div>
                )}
                
                {messages.map((m: Message, i: number) => (
                  <ChatBubble key={i} role={m.role} text={m.text} />
                ))}
                
                {chatLoading && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span>AI sedang mengetik...</span>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() }}
                    placeholder="Ketik pesan Anda..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={chatLoading || !input.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Powered by n8n webhook • AI Agent Promosi BKPP
                </p>
              </div>
            </div>
          )}

          {/* Chat Toggle Button */}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`w-14 h-14 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 ${
              isChatOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'
            } text-white flex items-center justify-center relative`}
          >
            {!isChatOpen ? (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {/* Notification Badge */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">!</span>
                </div>
                {/* Pulsing Ring */}
                <div className="absolute inset-0 rounded-full border-4 border-blue-400 animate-ping opacity-75"></div>
              </>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </Layout>
    </>
  )
}