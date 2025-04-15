// pages/api/listings/delete.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Sadece DELETE isteklerine izin verilir' });
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'İlan ID gerekli' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('estate-db');

    const result = await db.collection('ilanlar').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'İlan bulunamadı' });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Silme hatası:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
}
