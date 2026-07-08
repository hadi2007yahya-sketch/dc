const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const http = require('http');

// 1. Port açma (Render'ı susturmak için)
http.createServer((req, res) => {
    res.write('Bot aktif');
    res.end();
}).listen(process.env.PORT || 3000);

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

client.on('ready', () => {
    console.log("Bot giriş yaptı!");
    const channel = client.channels.cache.get("1447158114376880188");
    if (channel) {
        joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });
        console.log("Kanala girildi.");
    } else {
        console.log("Kanal bulunamadı.");
    }
});

client.login(process.env.TOKEN);
