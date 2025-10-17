import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

// Chat interfaces and components
interface Message {
  role: 'user' | 'bot';
  text: string;
}

interface ApiResponse {
  ok: boolean;
  text: string;
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
  );
};

// Send to N8N function
const sendToN8n = async (text: string): Promise<ApiResponse> => {
  try {
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK;
    if (!webhookUrl) {
      return { ok: false, text: 'Webhook URL tidak dikonfigurasi' };
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: text }),
    });

    if (response.ok) {
      const data = await response.json();
      return { ok: true, text: data.output || data.message || 'Pesan berhasil dikirim' };
    } else {
      return { ok: false, text: 'Gagal mengirim pesan ke n8n' };
    }
  } catch (error) {
    return { ok: false, text: 'Terjadi kesalahan koneksi' };
  }
};

export default function Home() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [showMoreActivity, setShowMoreActivity] = useState(false);
  
  // Chat bubble states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    
    setInput('');
    setMessages((m) => [...m, { role: 'user', text }]);
    setLoading(true);

    const res = await sendToN8n(text);

    setMessages((m) => [
      ...m,
      { role: 'bot', text: res.text },
    ]);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>AI Agent Promosi BKPP - Professional Network</title>
        <meta name="description" content="Platform profesional untuk sistem promosi pegawai BKPP" />
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
            <Link href="/" className="flex flex-col items-center gap-1 text-blue-600 border-b-2 border-blue-600 pb-2">
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
            <a href="#" className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zm-3-13h3l-3-3v3zm-2 0H7a2 2 0 00-2 2v10a2 2 0 002 2h3" />
              </svg>
              <span className="text-xs font-medium">Notifications</span>
            </a>
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
          
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-4">
              <div className="h-16 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <div className="px-4 pb-4 -mt-8">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl border-4 border-white">
                    JD
                  </div>
                  <h3 className="font-semibold text-gray-800 mt-2">John Doe</h3>
                  <p className="text-sm text-gray-600 text-center">Data Analyst at BKPP | AI Enthusiast</p>
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
                  <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    Try Premium
                  </a>
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
                  UI UX Design
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  Web Development
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  Machine Learning
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

              <h4 className="font-semibold text-gray-800 mb-3 text-sm mt-4">HASHTAGS</h4>
              <div className="space-y-2">
                <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                  <span className="text-gray-400">#</span>
                  dataanalyst
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                  <span className="text-gray-400">#</span>
                  promosi
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
                  JD
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
              {/* Post 1 */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    BL
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Benjamin Leo</h3>
                    <p className="text-sm text-gray-600">Kepala BKPP | Sistem Promosi Expert</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Sistem AI Agent untuk promosi pegawai BKPP telah menunjukkan hasil yang luar biasa! 
                  Dengan akurasi 94%, kini proses evaluasi dan rekomendasi promosi menjadi lebih objektif dan efisien. 
                  #PromosiBKPP #AIAgent
                </p>
                <div className="w-full h-48 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-blue-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p className="text-gray-600">AI Analytics Dashboard</p>
                  </div>
                </div>
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
                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">15 likes • 3 comments</p>
                </div>
              </div>

              {/* Post 2 */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                    CS
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Claire Smith</h3>
                    <p className="text-sm text-gray-600">HR Specialist | Data Analytics</p>
                    <p className="text-xs text-gray-500">4 hours ago</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Tips mengoptimalkan penggunaan AI Agent untuk evaluasi kinerja:
                  <br />1. Input data yang akurat dan lengkap
                  <br />2. Gunakan metrik yang terstandarisasi  
                  <br />3. Review hasil analisis secara berkala
                  <br />4. Libatkan feedback dari supervisor langsung
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
                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">28 likes • 7 comments</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            {/* Trending News */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800">Trending News</h4>
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </div>
              <div className="space-y-3">
                <div>
                  <a href="#" className="text-sm font-medium text-gray-800 hover:text-blue-600">
                    High Demand for AI Skills in Government
                  </a>
                  <p className="text-xs text-gray-500 mt-1">1d ago • 10,934 readers</p>
                </div>
                <div>
                  <a href="#" className="text-sm font-medium text-gray-800 hover:text-blue-600">
                    Digital Transformation in Public Sector
                  </a>
                  <p className="text-xs text-gray-500 mt-1">2d ago • 7,043 readers</p>
                </div>
                <div>
                  <a href="#" className="text-sm font-medium text-gray-800 hover:text-blue-600">
                    New Regulations for Employee Promotion
                  </a>
                  <p className="text-xs text-gray-500 mt-1">4d ago • 17,789 readers</p>
                </div>
                <div>
                  <a href="#" className="text-sm font-medium text-gray-800 hover:text-blue-600">
                    AI in HR Management Best Practices  
                  </a>
                  <p className="text-xs text-gray-500 mt-1">9d ago • 2,436 readers</p>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:underline">Read More</a>
              </div>
            </div>

            {/* Ad */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500">Ad • • •</span>
              </div>
              <p className="text-sm font-medium text-gray-800 mb-3">Master AI & Data Analytics</p>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  AI
                </div>
                <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white font-bold text-xs">
                  B
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-800 mb-2">Build Your AI Career in BKPP</p>
              <a href="#" className="text-sm text-blue-600 hover:underline">Learn More</a>
            </div>

            {/* Footer Links */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
                <a href="#" className="hover:text-blue-600">About</a>
                <a href="#" className="hover:text-blue-600">Accessibility</a>
                <a href="#" className="hover:text-blue-600">Help Center</a>
                <a href="#" className="hover:text-blue-600">Privacy Policy</a>
                <a href="#" className="hover:text-blue-600">Advertising</a>
                <a href="#" className="hover:text-blue-600">Get the App</a>
                <a href="#" className="hover:text-blue-600">More</a>
              </div>
              <div className="flex items-center gap-2 pt-3 border-t">
                <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">
                  AI
                </div>
                <p className="text-xs text-gray-500">AI Agent Promosi © 2024. All Rights Reserved</p>
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
              
              {messages.map((m, i) => (
                <ChatBubble key={i} role={m.role} text={m.text} />
              ))}
              
              {loading && (
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
                  onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
                  placeholder="Ketik pesan Anda..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
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
      </div>
    </>
  );
}