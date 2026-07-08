const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const express = require('express'); // 1. Express'i ekle
const app = express();
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

app.get('/', (req, res) => res.send('Bot aktif!')); // 2. Boş bir sayfa aç
app.listen(3000); // 3. Portu dinle

client.once('ready', () => {
    const channel = client.channels.cache.get("1447158114376880188");
    if (channel) {
        joinVoiceChannel({ channelId: channel.id, guildId: channel.guild.id, adapterCreator: channel.guild.voiceAdapterCreator });
    }
});

client.login(process.env.TOKEN);
