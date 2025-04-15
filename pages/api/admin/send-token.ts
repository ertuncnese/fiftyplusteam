// pages/api/admin/send-token.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import nodemailer from 'nodemailer';

const ADMIN_EMAILS = ['ertunc.nese@hotmail.com'];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { email } = req.body;

  if (!email || !ADMIN_EMAILS.includes(email)) {
    return res.status(401).json({ error: 'Yetkisiz erişim' });
  }

  // Token üret
  const token = Math.floor(100000 + Math.random() * 900000).toString(); // 6 haneli sayı
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 dk geçerli

  try {
    const client = await clientPromise;
    const db = client.db('estate-db');

    await db.collection('admin_tokens').insertOne({
      email,
      token,
      expiresAt,
      createdAt: new Date(),
    });

    // Mail gönder
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // SSL kullan
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

    await transporter.sendMail({
      from: `"FiftyPlus Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'FiftyPlus Giriş Kodu',
      text: `Giriş kodunuz: ${token}`,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Token gönderme hatası:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
}
