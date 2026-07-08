const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Bot aktif!'));
app.listen(process.env.PORT || 3000);
const { Client, GatewayIntentBits, ChannelType } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
});

// BURAYA ID'LERİNİ YAZ
const PARENT_VOICE_CHANNEL_ID = '1524385072570961920';
const BOT_STAY_CHANNEL_ID = '1447158114376880188';

client.once('ready', async () => {
    console.log('Bot başarıyla aktif oldu!');
    const channel = client.channels.cache.get(BOT_STAY_CHANNEL_ID);
    if (channel) {
        joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });
    }
});

client.on('voiceStateUpdate', async (oldState, newState) => {
    if (newState.channelId === PARENT_VOICE_CHANNEL_ID) {
        const member = newState.member;
        const guild = newState.guild;
        const newChannel = await guild.channels.create({
            name: `🔊 ${member.displayName} Odası`,
            type: ChannelType.GuildVoice,
            parent: newState.channel.parent
        });
        member.voice.setChannel(newChannel);
    }
});

client.login('');
