const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({ intents: [3276799] }); // Tüm izinleri açar

client.once('ready', () => {
    const channel = client.channels.cache.get("1447158114376880188");
    if (channel) {
        joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });
    }
});

client.login(process.env.TOKEN);
