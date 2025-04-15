// /pages/api/listings/all.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('estate-db');

  const type = req.query.type; // "satilik" veya "kiralik"

  const query = type ? { type } : {};

  const listings = await db.collection('ilanlar').find(query).sort({ createdAt: -1 }).toArray();

  const serialized = listings.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));

  res.status(200).json(serialized);
}

