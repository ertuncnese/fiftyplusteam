// components/Offices.tsx
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const offices = [
  {
    name: 'Bursa Ofisi',
    status: 'Aktif',
    address: 'ÜÇEVLER MAHALLESİ 60.(220) SOKAĞI No : 1 A-OFİS/İŞYERİ A BLOK/3 NİLÜFER/ BURSA',
    phone: '+90 532 414 2819',
    email: 'info@fiftyplusteam.com',
    whatsapp: '+90 532 414 2819',
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24380.166376496676!2d28.907921187445336!3d40.197476748087105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca11e05bec159b%3A0x416a42640ff1b3a5!2sFiftyplus%20Team!5e0!3m2!1sen!2str!4v1744693330177!5m2!1sen!2str"
  },
  {
    name: 'Kıbrıs Ofisi',
    status: 'Yakında Açılıyor',
    address: 'Girne / KKTC',
    phone: '+90 532 414 2819',
    email: 'info@fiftyplusteam.com',
    whatsapp: '+90 532 414 2819',
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d719873.6953135526!2d33.041114206122955!3d35.05761280388378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de0d14eb3ab9df%3A0xc5527a6b9bd7adfd!2zS8SxYnLEsXM!5e0!3m2!1sen!2str!4v1744693766391!5m2!1sen!2str"
  }
];

export default function Offices() {
  return (
    <section id="ofislerimiz" className="scroll-mt-28 max-w-7xl mx-auto px-6 py-20 text-gray-800">
      <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">Ofislerimiz</h2>

      <div className="grid gap-10 md:grid-cols-2">
        {offices.map((ofis, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-blue-900">{ofis.name}</h3>
              <p className="text-sm text-gray-500 italic">{ofis.status}</p>
              <p className="flex items-center text-sm text-gray-700 gap-2"><FaMapMarkerAlt className="text-blue-600" /> {ofis.address}</p>
              {ofis.phone && <p className="flex items-center text-sm text-gray-700 gap-2"><FaPhoneAlt className="text-blue-600" /> {ofis.phone}</p>}
              {ofis.whatsapp && <p className="flex items-center text-sm text-gray-700 gap-2"><FaWhatsapp className="text-green-600" /> {ofis.whatsapp}</p>}
              {ofis.email && <p className="flex items-center text-sm text-gray-700 gap-2"><FaEnvelope className="text-blue-600" /> {ofis.email}</p>}
            </div>

            {ofis.mapEmbed && (
              <div className="mt-4">
                <iframe
                  src={ofis.mapEmbed}
                  width="100%"
                  height="250"
                  className="rounded-lg border"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
