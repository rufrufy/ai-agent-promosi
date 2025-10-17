import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Add missing interfaces
interface Message {
  role: 'user' | 'bot';
  text: string;
}

interface ApiResponse {
  ok: boolean;
  text: string;
}

// Add missing ChatBubble component
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

// Add missing sendToN8n function
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

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const send = async () => {
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
        <title>Chat - AI Agent Promosi BKPP</title>
        <meta name="description" content="Chat dengan AI Agent Promosi BKPP untuk konsultasi sistem promosi pegawai" />
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
              <Link href="/chat" className="flex flex-col items-center gap-1 text-blue-600 border-b-2 border-blue-600 pb-2">
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

        {/* Chat Container */}
        <div className="container mx-auto px-4 py-6 max-w-4xl h-full">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 h-full flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  AI
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">AI Agent Promosi BKPP</h1>
                  <p className="text-sm text-gray-600">Konsultasi sistem promosi pegawai dengan AI</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {process.env.NEXT_PUBLIC_N8N_WEBHOOK ? 'Connected' : 'Disconnected'}
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4" ref={listRef}>
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Selamat Datang! 👋</h3>
                  <p className="text-gray-600 mb-4">
                    Saya AI Agent Promosi BKPP. Tanyakan apa saja tentang sistem promosi pegawai!
                  </p>
                  <p className="text-sm text-gray-500">
                    Contoh: "Pegawai A memiliki kinerja sangat baik, disiplin tinggi, dan mengikuti 3 pelatihan"
                  </p>
                </div>
              )}
              
              {messages.map((m, i) => (
                <ChatBubble key={i} role={m.role} text={m.text} />
              ))}
              
              {loading && (
                <div className="flex items-center gap-3 p-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-600">
                    AI sedang menganalisis data...
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex gap-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
                  placeholder="Ketik data pegawai untuk analisis promosi..."
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                />
                <button
                  onClick={send}
                  disabled={loading || !input.trim()}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Kirim
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">
                Powered by n8n webhook • AI Agent Promosi BKPP • Data akan dianalisis sesuai standar BKPP
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}