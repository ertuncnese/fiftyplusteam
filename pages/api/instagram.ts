import { NextApiRequest, NextApiResponse } from 'next';
import * as cheerio from 'cheerio';
import * as he from 'he';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      const htmlRes = await fetch('https://rss.app/feeds/otYQNyt9BGA1kQdp.xml');
      const xml = await htmlRes.text();
      const $ = cheerio.load(xml, { xmlMode: true });
  
      const posts: { image?: string; link: string; title?: string }[] = [];
  
      $('item').each((_, el) => {
        const link = $(el).find('link').text();
        const rawDesc = $(el).find('description').text();
        const title = $(el).find('title').text();
  
        const decodedDesc = he.decode(rawDesc);
        const match = decodedDesc.match(/<img[^>]+src="([^">]+)"/);
  
        posts.push({
          link,
          image: match?.[1], // olabilir de olmayabilir de
          title: title.trim(),
        });
      });
  
      console.log('Çekilen görsel sayısı:', posts.length);
      res.status(200).json(posts);
    } catch (err) {
      console.error('Instagram feed parse hatası:', err);
      res.status(500).json({ error: 'Veri alınamadı' });
    }
  }
  
