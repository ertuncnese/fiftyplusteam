// pages/portfoyler.tsx
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';

const Portfolio = dynamic(() => import('@/components/Portfolio'), { ssr: false });

export default function PortfoylerPage() {
  return (
    <>
      <Head>
        <title>Portföyler | Fifty Plus Team</title>
      </Head>
      <Header />
      
      <Portfolio />
    </>
  );
}