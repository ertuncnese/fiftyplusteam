'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="Fifty Plus Logo" width={160} height={50} />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 text-blue-900 text-sm font-medium">
          <Link href="/#hakkimizda" className="hover:text-blue-700 transition">Hakkımızda</Link>
          <Link href="/#ekibimiz" className="hover:text-blue-700 transition">Ekibimiz</Link>
          <Link href="/#hizmetler" className="hover:text-blue-700 transition">Hizmetlerimiz</Link>
          <Link href="/#ofislerimiz" className="hover:text-blue-700 transition">Ofislerimiz</Link>
          <Link href="/portfoyler" className="hover:text-blue-700 transition">Portföyler</Link>
          <Link href="/#haberler" className="hover:text-blue-700 transition">Haberler</Link>
          <Link href="/#iletisim" className="hover:text-blue-700 transition">İletişim</Link>
        </nav>

        {/* Hamburger icon - Mobile */}
        <button
          className="md:hidden text-blue-900 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menüyü Aç/Kapat"
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white px-6 pb-4 space-y-3 text-blue-900 text-sm font-medium">
          <Link href="/#hakkimizda" onClick={handleNavClick} className="block hover:text-blue-700 transition">Hakkımızda</Link>
          <Link href="/#ekibimiz" onClick={handleNavClick} className="block hover:text-blue-700 transition">Ekibimiz</Link>
          <Link href="/#hizmetler" onClick={handleNavClick} className="block hover:text-blue-700 transition">Hizmetlerimiz</Link>
          <Link href="/#ofislerimiz" onClick={handleNavClick} className="block hover:text-blue-700 transition">Ofislerimiz</Link>
          <Link href="/portfoyler" onClick={handleNavClick} className="block hover:text-blue-700 transition">Portföyler</Link>
          <Link href="/#haberler" onClick={handleNavClick} className="block hover:text-blue-700 transition">Haberler</Link>
          <Link href="/#iletisim" onClick={handleNavClick} className="block hover:text-blue-700 transition">İletişim</Link>
        </nav>
      )}
    </header>
  );
}



