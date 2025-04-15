'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const banners = ['/banner1.jpg', '/banner2.jpg', '/banner3.jpg'];

export default function BannerCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000); // 5 saniyede bir geçiş
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[280px] sm:h-[420px] md:h-[480px] overflow-hidden">
  <AnimatePresence mode="wait">
    <motion.div
      key={banners[index]}
      className="absolute inset-0"
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 1 }}
    >
      <Image
        src={banners[index]}
        alt={`Banner ${index + 1}`}
        fill
        className="object-cover w-full h-full"
        priority
      />
    </motion.div>
  </AnimatePresence>
</div>
  );
}

