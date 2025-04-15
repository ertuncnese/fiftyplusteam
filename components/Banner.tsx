import Image from 'next/image';

export default function Banner() {
  return (
    <section
      className="relative h-[460px] bg-center bg-cover flex items-center justify-center"
      style={{ backgroundImage: 'url("/banner.jpg")' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          BURSA | Fifty Plus
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Profesyonel ve Güvenilir Gayrimenkul Hizmetleri
        </p>
        <div className="flex gap-4 justify-center text-sm">
          <span className="bg-white text-blue-900 font-semibold px-4 py-1 rounded-full shadow">7 Yıl</span>
          <span className="bg-white text-blue-900 font-semibold px-4 py-1 rounded-full shadow">Satılık: 231</span>
          <span className="bg-white text-blue-900 font-semibold px-4 py-1 rounded-full shadow">Kiralık: 21</span>
        </div>
      </div>
    </section>
  );
}
