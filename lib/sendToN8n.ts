import axios from 'axios';


export type N8nResult = {
ok: boolean;
text: string;
data?: any;
};


export async function sendToN8n(message: string): Promise<N8nResult> {
const url = process.env.NEXT_PUBLIC_N8N_WEBHOOK || '';
if (!url) return { ok: false, text: 'Webhook URL belum di-set.' };


try {
const res = await axios.post(url, { message }, {
headers: { 'Content-Type': 'application/json' },
timeout: 20000,
// withCredentials: false // set jika perlu cookie
});


// Tangani kemungkinan response berbentuk text/plain atau JSON
const data = res.data;
if (typeof data === 'string') {
return { ok: true, text: data };
}


// Ambil bidang umum: reply, message, output, result — fallback ke stringify
const candidate = data.reply || data.message || data.output || data.result;
return {
ok: true,
text: typeof candidate === 'string' ? candidate : JSON.stringify(data, null, 2),
data,
};
} catch (err: any) {
if (err?.response) {
return { ok: false, text: `Error ${err.response.status}: ${JSON.stringify(err.response.data)}` };
}
if (err?.code === 'ECONNABORTED') {
return { ok: false, text: 'Timeout menghubungi n8n (20s). Periksa koneksi/CORS.' };
}
return { ok: false, text: 'Gagal menghubungi n8n. Cek CORS, DNS, atau URL webhook.' };
}
}