'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const banners = ['/banner1.jpg', '/banner2.jpg', '/banner3.jpg'];

export default function BannerCarousel() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // sm breakpoint altı
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[280px] sm:h-[420px] md:h-[480px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={banners[index]}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: isMobile ? 1 : 1 }}
          animate={{ opacity: 1, scale: isMobile ? 1.5 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <Image
            src={banners[index]}
            alt={`Banner ${index + 1}`}
            fill
            className="object-contain w-full h-full"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}



