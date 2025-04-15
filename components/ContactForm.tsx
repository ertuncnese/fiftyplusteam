'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async () => {
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, subject, message }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gönderim hatası');

      setStatus('success');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Bilinmeyen hata');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-bold text-blue-900 text-center mb-2">İletişim Formu</h2>

      <input
        type="email"
        placeholder="E-posta adresiniz"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border px-4 py-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Konu"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full border px-4 py-2 rounded"
        required
      />
      <textarea
        placeholder="Mesajınız"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full border px-4 py-2 rounded h-40"
        required
      />

      <button
        onClick={handleSubmit}
        disabled={status === 'sending'}
        className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition w-full"
      >
        {status === 'sending' ? 'Gönderiliyor...' : 'Gönder'}
      </button>

      {status === 'success' && (
        <p className="text-green-600 text-center">✅ Mesajınız başarıyla gönderildi.</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 text-center">❌ {errorMsg}</p>
      )}
    </div>
  );
}
