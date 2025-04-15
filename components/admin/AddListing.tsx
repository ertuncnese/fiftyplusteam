 'use client';
import { useState } from 'react';

export default function AddListing({ onAdd }: { onAdd: () => void }) {
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'satilik' | 'kiralik'>('satilik');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    if (!link.startsWith('http')) {
      setError('Lütfen geçerli bir bağlantı girin.');
      return;
    }

    try {
      const res = await fetch('/api/listings/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link, title, type }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Hata oluştu');

      setSuccess('İlan başarıyla eklendi');
      setLink('');
      setTitle('');
      setType('satilik');
      onAdd();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded-xl space-y-4 max-w-xl mx-auto">
      <h2 className="text-lg font-semibold text-blue-900">Yeni İlan Ekle</h2>

      <input
        type="text"
        placeholder="İlan linki (Instagram, Sahibinden, vb)"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="w-full border px-4 py-2 rounded"
      />

      <input
        type="text"
        placeholder="İsteğe bağlı başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-4 py-2 rounded"
      />

      <div className="flex gap-4 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="type"
            value="satilik"
            checked={type === 'satilik'}
            onChange={() => setType('satilik')}
          />
          Satılık
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="type"
            value="kiralik"
            checked={type === 'kiralik'}
            onChange={() => setType('kiralik')}
          />
          Kiralık
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
      >
        Ekle
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}
    </div>
  );
}
