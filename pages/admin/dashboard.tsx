import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      router.replace('/admin-login');
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">🔐 Admin Paneli</h1>
      <p className="text-gray-700 mb-4">Hoş geldiniz! Buradan ilanları yönetebilirsiniz.</p>

      <ul className="space-y-4">
        <li>
          <a href="/admin/add-listing" className="text-blue-700 hover:underline">
            ➕ Yeni İlan Ekle
          </a>
        </li>
        <li>
          <a href="/admin/listings" className="text-blue-700 hover:underline">
            📄 İlanları Listele / Düzenle / Sil
          </a>
        </li>
      </ul>
    </div>
  );
}
