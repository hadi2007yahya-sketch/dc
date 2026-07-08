const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Bot aktif'));
app.listen(3000);

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

client.on('ready', () => {
    console.log(`${client.user.tag} olarak giriş yapıldı!`);
    
    // Gecikme ekleyelim ki kanal bilgisi cache'e yüklensin
    setTimeout(() => {
        const channel = client.channels.cache.get("1447158114376880188");
        if (channel) {
            joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });
            console.log("Kanala bağlanıldı.");
        } else {
            console.log("Kanal ID bulunamadı, ID'yi kontrol et.");
        }
    }, 5000); // 5 saniye bekle
});

client.login(process.env.TOKEN);
