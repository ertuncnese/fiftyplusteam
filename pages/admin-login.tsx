import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [step, setStep] = useState<'email' | 'token'>('email');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const router = useRouter();

  const handleSendToken = async () => {
    setError('');
    setInfo('');
    try {
      const res = await fetch('/api/admin/send-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Hata oluştu');

      setInfo(data.message);
      setStep('token');
    } catch (err: any) {
      setError(err.message || 'Beklenmeyen bir hata');
    }
  };

  const handleVerifyToken = async () => {
    setError('');
    try {
      const res = await fetch('/api/admin/verify-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Hata oluştu');

      // Token doğrulandı, admin paneline yönlendir
      localStorage.setItem('admin_email', email);
      localStorage.setItem('isAdmin', 'true'); // ✅ bu satırı ekle
      router.push('/admin/dashboard'); // ✨ admin panel yolun neyse
    } catch (err: any) {
      setError(err.message || 'Kod doğrulaması başarısız');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6">
        <h1 className="text-xl font-semibold text-blue-900 text-center">Admin Giriş</h1>

        {step === 'email' && (
          <>
            <input
              type="email"
              placeholder="E-posta adresiniz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
            <button
              onClick={handleSendToken}
              className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition"
            >
              Giriş Kodu Gönder
            </button>
          </>
        )}

        {step === 'token' && (
          <>
            <input
              type="text"
              placeholder="E-posta adresinize gelen kod"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
            <button
              onClick={handleVerifyToken}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-500 transition"
            >
              Giriş Yap
            </button>
          </>
        )}

        {info && <p className="text-sm text-green-600">{info}</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
