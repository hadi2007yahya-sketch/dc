const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const client = new Client({ intents: [3276799] });

client.on('ready', () => {
    console.log(`Giriş yapıldı: ${client.user.tag}`);
    const channel = client.channels.cache.get("1447158114376880188");
    
    if (!channel) {
        console.log("HATA: Kanalı bulamıyorum! Sunucuda mıyım? ID doğru mu?");
        return;
    }
    
    try {
        joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });
        console.log("BAŞARILI: Kanala giriş yaptım.");
    } catch (e) {
        console.log("BAĞLANMA HATASI:", e);
    }
});

client.login(process.env.TOKEN);
