import { useEffect, useState } from 'react';

type Post = {
  image?: string;
  link: string;
  title?: string;
};

export default function InstagramFooter() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/instagram');
        const data = await res.json();
        setPosts(data.slice(0, 6)); // sadece ilk 6 post
      } catch (err) {
        console.error('Instagram feed çekilemedi:', err);
      }
    };

    fetchPosts();
  }, []);

  if (!posts.length) return null;

  return (
    <section className="bg-gray-100 py-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-xl font-semibold text-blue-900 mb-4 text-center">Instagram'da Biz</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {posts.map((post, idx) => (
            <a
              key={idx}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded overflow-hidden group"
            >
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.title ?? 'Instagram görseli'}
                  className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-28 flex items-center justify-center bg-white text-xs text-gray-500 text-center p-2">
                  {post.title ?? 'Yeni paylaşım'}
                </div>
              )}
            </a>
          ))}
        </div>
        <div className="text-center mt-4">
          <a
            href="https://www.instagram.com/fiftyplusteam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-800 text-sm hover:underline"
          >
            Daha fazlası için Instagram sayfamızı ziyaret edin →
          </a>
        </div>
      </div>
    </section>
  );
}
