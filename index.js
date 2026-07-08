const { Client, GatewayIntentBits, ChannelType } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages
    ]
});

// AYARLAR (Buraları Discord ID'lerin ile dolduracaksın)
const ANA_SES_KANALI_ID = "BURAYA_TIKLAYINCA_ODA_ACILACAK_SES_KANALININ_ID_YAZ";
const BOTUN_GIRECEGI_SES_KANALI_ID = "BURAYA_BOTUN_SABIT_DURACAGI_SES_KANALININ_ID_YAZ";

const geciciKanallar = new Map();

client.on('ready', () => {
    console.log(`${client.user.tag} aktif!`);
    
    try {
        const guild = client.guilds.cache.first();
        joinVoiceChannel({
            channelId: BOTUN_GIRECEGI_SES_KANALI_ID,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator,
            selfMute: false,
            selfDeaf: true
        });
        console.log("Bot sese girdi!");
    } catch (error)
