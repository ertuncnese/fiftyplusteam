import { useState, useEffect } from 'react';
import AddListing from '@/components/admin/AddListing';
import { FaTrash } from 'react-icons/fa';

type Listing = {
  _id: string;
  link: string;
  title?: string;
  type?: 'satilik' | 'kiralik';
  createdAt: string;
};

export default function AdminPanel() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchListings = async () => {
    const res = await fetch('/api/listings/all');
    const data = await res.json();
    setListings(data);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      const res = await fetch('/api/listings/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedId }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Silme başarısız');
      }

      setShowModal(false);
      setSelectedId(null);
      fetchListings(); // Güncelleme
    } catch (err: any) {
      alert(err.message || 'Hata oluştu');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-10">
      <h1 className="text-2xl font-bold text-blue-900 text-center">Admin Panel</h1>

      <AddListing onAdd={fetchListings} />

      <div className="max-w-2xl mx-auto mt-10">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">Ekli İlanlar</h2>
        <ul className="space-y-4">
        {listings.map((item) => (
  <li
    key={item._id}
    className="bg-white p-4 rounded shadow flex flex-col sm:flex-row justify-between items-start sm:items-center"
  >
    <div className="flex-1">
      <p className="font-medium text-blue-800 flex items-center gap-2">
        {item.title || 'Başlıksız'}
        {item.type && (
          <span className="text-xs font-semibold bg-blue-900 text-white px-2 py-0.5 rounded">
            {item.type === 'kiralik' ? 'Kiralık' : 'Satılık'}
          </span>
        )}
      </p>
      <a
        href={item.link}
        className="text-sm text-blue-600 hover:underline break-all"
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.link}
      </a>
    </div>

    <button
      onClick={() => {
        setSelectedId(item._id);
        setShowModal(true);
      }}
      className="text-red-600 hover:text-red-800 mt-2 sm:mt-0 sm:ml-4"
      aria-label="Sil"
    >
      <FaTrash />
    </button>
  </li>
))}
        </ul>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-800 text-center">İlanı silmek istediğinize emin misiniz?</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Evet, Sil
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedId(null);
                }}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                Vazgeç
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
