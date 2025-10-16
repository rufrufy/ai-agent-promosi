import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

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
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        role === 'user' 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-100 text-gray-800'
      }`}>
        {text}
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

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLElement>(null);

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
        <title>Agent Promosi BKPP</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="flex flex-col h-screen max-w-2xl mx-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
          <div className="px-4 py-3 flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-blue-600 text-white grid place-items-center font-bold">AI</div>
            <div>
              <h1 className="text-base font-semibold">Agent Promosi BKPP</h1>
              <p className="text-xs text-gray-500">Terhubung ke n8n webhook</p>
            </div>
            <div className="ml-auto text-xs text-gray-400">
              {process.env.NEXT_PUBLIC_N8N_WEBHOOK ? 'Webhooks OK' : 'Webhook missing'}
            </div>
          </div>
        </header>

        {/* Message list */}
        <main ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((m, i) => (
            <ChatBubble key={i} role={m.role} text={m.text} />
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="inline-flex h-2 w-2 rounded-full bg-gray-400 animate-pulse"></span>
              Bot sedang mengetik…
            </div>
          )}
        </main>

        {/* Composer */}
        <footer className="border-t bg-white p-3">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
              placeholder="Contoh: Pegawai A, kinerja sangat baik, disiplin tinggi, ikut 3 pelatihan"
              className="flex-1 px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Mengirim…' : 'Kirim'}
            </button>
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            Kirimkan data faktual; perhitungan skor dilakukan di n8n sesuai logika bisnis BKPP.
          </p>
        </footer>
      </div>
    </>
  );
}