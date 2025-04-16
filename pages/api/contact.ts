// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({ error: 'Tüm alanlar zorunludur.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // örnek: fiftyplusteamadmn@gmail.com
        pass: process.env.EMAIL_PASS, // uygulama şifresi
      },
    });

    await transporter.sendMail({
      from: `"Web Form" <${process.env.EMAIL_USER}>`,
      to: ['ayda@fiftyplusteam.com', 'oral@fiftyplusteam.com', 'ertunc.nese@hotmail.com'],
      //to: ['ertunc.nese@hotmail.com'],
      subject: `İletişim Formu: ${subject}`,
      text: `
Gönderen: ${email}

Konu: ${subject}

Mesaj:
${message}
      `,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Mail gönderim hatası:', err);
    res.status(500).json({ error: 'Mesaj gönderilemedi.' });
  }
}
