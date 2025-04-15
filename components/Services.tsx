import Image from "next/image";

export default function Services() {
  return (
    <section id="hizmetler" className="scroll-mt-24 max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-blue-900 mb-10 text-center">Hizmetlerimiz</h2>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Hizmet Listesi */}
        <ul className="space-y-4 text-lg leading-relaxed text-gray-800 list-disc list-inside">
          <li>Her türlü alım, satım ve kiralama hizmetleri</li>
          <li>Profesyonel portföy yönetimi</li>
          <li>Doğru ihtiyaç analizi ile hedefe yönelik çözüm</li>
          <li>Ücretsiz gayrimenkul ekspertizi</li>
          <li>Kat karşılığı ticari ve konut arabuluculuk & danışmanlık</li>
          <li>Paylaşıma açık, amaca yönelik hızlı sonuç odaklı yaklaşım</li>
          <li>Kuzey Kıbrıs (KKTC) yatırım danışmanlığı</li>
        </ul>

        {/* Harita Görseli */}
        <div className="w-full h-auto rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/map.png"
            alt="Hizmet Bölgeleri Haritası"
            width={800}
            height={500}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
