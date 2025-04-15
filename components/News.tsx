import { useEffect, useState } from 'react';
import clsx from 'clsx';

type Post = {
  image?: string;
  link: string;
  title?: string;
};

export default function News() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/instagram');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error('Instagram verisi alınamadı:', err);
      }
    };
    fetchPosts();
  }, []);

  // Otomatik geçiş
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % posts.length);
        setFade(true);
      }, 500); // fade out süresi
    }, 5000); // 5 saniyede bir

    return () => clearInterval(interval);
  }, [posts]);

  const goToSlide = (index: number) => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setFade(true);
    }, 300);
  };

  const post = posts[currentIndex];

  return (
    <section id="haberler" className="scroll-mt-28 max-w-xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-blue-900 mb-10 text-center">Haberler</h2>

      {post ? (
        <div className="relative">
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              'block bg-white rounded-lg shadow hover:shadow-xl transform transition duration-300 ease-in-out hover:scale-105 overflow-hidden',
              fade ? 'opacity-100 transition-opacity duration-500' : 'opacity-0'
            )}
          >
            {post.image ? (
  <img
  src={post.image}
  alt={post.title ?? 'Instagram görseli'}
  className="w-full h-60 object-cover"
  referrerPolicy="no-referrer"
  onError={(e) => {
    const target = e.currentTarget;
    target.onerror = null; // sonsuz döngü engeli
    target.src = '/instagram-logo.png'; // Fallback görsel
    target.className = 'w-full h-60 object-contain p-4 opacity-60'; // yeni stil
  }}
/>

) : (
  <div className="p-6 h-60 flex items-center justify-center bg-gray-50">
    <img
      src="/instagram-logo.png" // 👉 public klasörüne bu dosyayı koy
      alt="Instagram"
      className="w-16 h-16 opacity-60"
    />
  </div>
)}

            <div className="p-4 text-sm text-gray-800 text-center">
              {post.title ?? '📢 Yeni haber!'}
            </div>
          </a>

          {/* Pagination dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {posts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={clsx(
                  'w-3 h-3 rounded-full',
                  idx === currentIndex
                    ? 'bg-blue-900'
                    : 'bg-gray-300 hover:bg-blue-400 transition-colors'
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Henüz içerik yüklenemedi...</p>
      )}
    </section>
  );
}

