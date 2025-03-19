import axios from 'axios';
import cheerio from 'cheerio';

async function capcutdl(url) {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const videoElement = $('video.player-o3g3Ag');
        const videoSrc = videoElement.attr('src');
        const title = $('h1.template-title').text().trim();
        const actionsDetail = $('p.actions-detail').text().trim();
        const [date, uses, likes] = actionsDetail.split(',').map(item => item.trim());
        const authorAvatar = $('span.lv-avatar-image img').attr('src');
        const authorName = $('span.lv-avatar-image img').attr('alt');

        if (!videoSrc || !title || !date || !uses || !likes || !authorAvatar || !authorName) {
            throw new Error('Beberapa elemen penting tidak ditemukan di halaman.');
        }

        return {
            title: title,
            date: date,
            pengguna: uses,
            likes: likes,
            author: {
                name: authorName,
                avatarUrl: authorAvatar
            },
            videoUrl: videoSrc,
        };
    } catch (error) {
        console.error('Error fetching video details:', error.message);
        return null;
    }
}

async function handler(m, { conn, text }) {
    if (!text) return m.reply('Mohon berikan URL CapCut yang valid.');

    const data = await capcutdl(text);
    if (!data) return m.reply('Gagal mengambil data. Pastikan URL yang diberikan benar.');

    const message = `
*Title:* ${data.title}
*Date:* ${data.date}
*Pengguna:* ${data.pengguna}
*Likes:* ${data.likes}
*Author:* ${data.author.name}
`.trim();

    conn.sendMessage(
        m.chat,
        {
            video: { url: data.videoUrl },
            caption: message,
        },
        { quoted: m }
    );
}

handler.help = ['capcut'].map(v => v + ' <URL>');
handler.command = /^(cc|capcut)$/i;
handler.tags = ["downloader"]
handler.limit = false;

export default handler;