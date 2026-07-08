const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

// Botu başlat
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ] 
});

// Botun uyumaması için Express (Web sunucusu)
const app = express();
app.get('/', (req, res) => res.send('Bot aktif!'));
app.listen(process.env.PORT || 3000);

// Bot hazır olduğunda
client.once('ready', () => {
    console.log(`${client.user.tag} olarak giriş yapıldı!`);
});

// Buraya kendi komutlarını ekleyebilirsin
client.on('messageCreate', (message) => {
    if (message.content === '!ping') {
        message.reply('Pong!');
    }
});

// TOKEN kısmı asla buraya yazılmaz, Render'daki Environment'tan çeker
client.login(process.env.TOKEN);
