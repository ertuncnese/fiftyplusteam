// pages/api/admin/verify-token.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, token } = req.body;
  if (!email || !token) {
    return res.status(400).json({ error: 'E-posta ve token gerekli.' });
  }

  const client = await clientPromise;
  const db = client.db('estate-db');

  // ✅ Doğru koleksiyon: admin_tokens
  const record = await db.collection('admin_tokens').findOne({ email, token });

  if (!record) {
    return res.status(401).json({ error: 'Kod geçersiz veya süresi dolmuş.' });
  }

  // Expiry kontrolü
  const now = new Date();
  if (record.expiresAt < now) {
    return res.status(401).json({ error: 'Kodun süresi dolmuş.' });
  }

  // Token geçerli: tek kullanımlık token'ı silelim
  await db.collection('admin_tokens').deleteOne({ _id: record._id });

  return res.status(200).json({ success: true, message: 'Giriş başarılı.' });
}

