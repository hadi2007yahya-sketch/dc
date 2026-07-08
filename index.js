const { Client, GatewayIntentBits, ChannelType } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildVoiceStates 
    ] 
});
const GUILD_ID = "1446797947399569460";
const SOURCE_CHANNEL_ID = "1524385072570961920";

client.on('voiceStateUpdate', async (oldState, newState) => {
    if (newState.channelId === SOURCE_CHANNEL_ID) {
        const guild = newState.guild;
        const newChannel = await guild.channels.create({
            name: `Oda - ${newState.member.user.username}`,
            type: ChannelType.GuildVoice,
            parent: newState.channel.parent,
        });
        await newState.member.voice.setChannel(newChannel);
    }

    if (oldState.channelId && oldState.channelId !== SOURCE_CHANNEL_ID) {
        const channel = oldState.channel;
        if (channel.name.startsWith("Oda -") && channel.members.size === 0) {
            channel.delete().catch(console.error);
        }
    }
});

client.login(TOKEN);
