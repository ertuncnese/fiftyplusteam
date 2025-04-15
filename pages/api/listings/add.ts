import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

function extractDomainName(url: string): string {
  try {
    const { hostname } = new URL(url);
    return hostname.replace('www.', '');
  } catch {
    return 'bilinmeyen-site';
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { link, title: customTitle, type } = req.body;

  if (!link || typeof link !== 'string') {
    return res.status(400).json({ error: 'Geçerli bir link girin' });
  }

  const allowedTypes = ['satilik', 'kiralik'];
  const listingType = allowedTypes.includes(type) ? type : 'satilik'; // default fallback

  let title = '';

  try {
    const response = await fetch(link);
    const html = await response.text();
    const match = html.match(/<title>(.*?)<\/title>/i);
    title = match?.[1]?.trim() || '';

    const isInvalidTitle =
      !title ||
      title.length < 5 ||
      /hata|error|just a moment|captcha|access denied/i.test(title);

    if (isInvalidTitle) {
      title = extractDomainName(link);
    }
  } catch (err) {
    console.warn('Başlık alınamadı, domain fallback:', err);
    title = extractDomainName(link);
  }

  if (customTitle && typeof customTitle === 'string' && customTitle.trim().length > 0) {
    title = customTitle.trim();
  }

  try {
    const client = await clientPromise;
    const db = client.db('estate-db');
    const result = await db.collection('ilanlar').insertOne({
      link,
      title,
      type: listingType,
      createdAt: new Date(),
    });

    res.status(201).json({ success: true, id: result.insertedId, title });
  } catch (error) {
    console.error('DB insert hatası:', error);
    res.status(500).json({ error: 'Veritabanına kaydedilemedi' });
  }
}
