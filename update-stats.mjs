import fs from 'node:fs';

const KEY = process.env.YT_API_KEY;
const ID = process.env.YT_CHANNEL_ID || 'UCbuPE90LBePkraxz0vGiBTw';
if (!KEY) { console.error('Falta el secret YT_API_KEY'); process.exit(1); }

const file = 'stats.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${ID}&key=${KEY}`);
if (!res.ok) { console.error(await res.text()); process.exit(1); }
const stats = (await res.json()).items?.[0]?.statistics;
if (!stats) { console.error('No se encontró el canal'); process.exit(1); }

const next = {
  subs: stats.hiddenSubscriberCount ? data.youtube.subs : Number(stats.subscriberCount),
  videos: Number(stats.videoCount),
};
if (next.subs === data.youtube.subs && next.videos === data.youtube.videos) {
  console.log('Sin cambios'); process.exit(0);
}
data.youtube = next;
data.updated = new Date().toISOString();
fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
console.log('Actualizado', next);
