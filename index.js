const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

const KANAL_ID = "BURAYA_SES_KANALI_ID_YAZ";

client.once('ready', () => {
    const channel = client.channels.cache.get(KANAL_ID);
    if (channel) {
        joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });
    }
});

client.login(process.env.TOKEN);
