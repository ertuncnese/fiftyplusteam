'use client';
import { useEffect, useState } from 'react';

type Listing = {
  _id: string;
  title: string;
  link: string;
  type: string;
};

export default function Portfolio() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [filter, setFilter] = useState<'satilik' | 'kiralik'>('satilik');

  useEffect(() => {
    fetch(`/api/listings/all?type=${filter}`)
      .then((res) => res.json())
      .then(setListings);
  }, [filter]);

  return (
    <section id="portfoyler" className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Portföyler</h2>

      <div className="flex justify-center gap-6 mb-8">
        <button
          className={`px-4 py-2 rounded ${filter === 'satilik' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-blue-900'}`}
          onClick={() => setFilter('satilik')}
        >
          Satılık
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === 'kiralik' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-blue-900'}`}
          onClick={() => setFilter('kiralik')}
        >
          Kiralık
        </button>
      </div>

      <ul className="space-y-4">
        {listings.map((item) => (
          <li key={item._id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold text-blue-800">{item.title}</p>
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 underline break-all">
              {item.link}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
