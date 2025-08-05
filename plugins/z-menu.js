let handler = async (m, { conn }) => {
  let caption = `Halo Kak Ada yang bisa aku bantu?\n\n*Bot Name :* 𝖳𝖾𝗇𝗌𝗈𝗎𝗋𝖺𝖲𝗒𝗇𝖼\n*Owner Name :* 𝑽𝑫𝒂𝒗𝒊𝒏𝒏\n*Library :* @adiwajshing/baileys\n*Script Type :* Plugins ECMAScipt-Module\n*Version :* 1.2.3`
  
  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/8zff1s.jpg' },
    gifPlayback: true,
    caption,
    footer: '𝑻𝒆𝒏𝒔𝒐𝒖𝒓𝒂𝑺𝒚𝒏𝒄 - 2025',
    buttons: [{ buttonId: '.allmenu', buttonText: { displayText: 'All Menu' }, type: 1 }],
    headerType: 1,
    viewOnce: true
  }, { quoted: m })

  await conn.sendMessage(m.chat, {
    audio: { url: 'https://files.catbox.moe/k15cxp.mp3' },
    mimetype: 'audio/mp4',
    ptt: true
  }, { quoted: m })
}

handler.help = ['menu']
handler.command = ['menu']
handler.tags = ['main']
handler.limit = false

export default handler
