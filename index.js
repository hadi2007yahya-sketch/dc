const { Client, GatewayIntentBits, ChannelType } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

// BURAYA DİKKAT: Ana kanalın ID'sini buraya yazmalısın
const PARENT_VOICE_CHANNEL_ID = 'ANA_SES_KANAL_ID_BURAYA'; 

client.once('ready', () => {
    console.log('Bot başarıyla aktif oldu!');
});

client.on('voiceStateUpdate', async (oldState, newState) => {
    // Üye belirlediğimiz ana ses kanalına girdiğinde
    if (newState.channelId === PARENT_VOICE_CHANNEL_ID) {
        try {
            const member = newState.member;
            const guild = newState.guild;

            // Yeni geçici oda açılıyor
            const newChannel = await guild.channels.create({
                name: `🔊 [${member.displayName}] Odası`,
                type: ChannelType.GuildVoice,
                parent: newState.channel.parentId // Ana kanalın kategorisine ekler
            });

            // Üyeyi yeni odaya taşı
            await member.voice.setChannel(newChannel);
        } catch (error) {
            console.error('Kanal oluşturulurken hata çıktı:', error);
        }
    }

    // Üye kanaldan çıktığında kontrol et
    if (oldState.channel) {
        const oldChannel = oldState.channel;
        
        // Eğer çıkılan kanal geçici odaysa ve adı "Odası" ile bitiyorsa (veya ana kanal değilse)
        // Ayrıca kanal tamamen boşaldıysa sil
        if (oldChannel.id !== PARENT_VOICE_CHANNEL_ID && oldChannel.name.includes('Odası') && oldChannel.members.size === 0) {
            try {
                await oldChannel.delete();
                console.log(`${oldChannel.name} boş kaldığı için otomatik silindi.`);
            } catch (error) {
                console.error('Kanal silinirken hata çıktı:', error);
            }
        }
    }
});

client.login(process.env.TOKEN);
