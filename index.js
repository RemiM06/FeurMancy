
// const { clientId, guildId, token, publicKey } = require('./config.json');
require('dotenv').config()
const APPLICATION_ID = process.env.APPLICATION_ID
const TOKEN = process.env.TOKEN
const PUBLIC_KEY = process.env.PUBLIC_KEY || 'not set'
const GUILD_ID = process.env.GUILD_ID


const axios = require('axios')
const express = require('express');
const { InteractionType, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions');
const { Client, GatewayIntentBits, Intents } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        Intents.FLAGS.GUILD_MEMBERS, // Needed to access user information
    ],
});

const app = express();
// app.use(bodyParser.json());

const discord_api = axios.create({
    baseURL: 'https://discord.com/api/',
    timeout: 3000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Authorization",
        "Authorization": `Bot ${TOKEN}`
    }
});

async function handleMessages(message) {
    const content = message.content.toLowerCase(); // Ensure case-insensitive matching

    if (content.includes('quoi')) { // Replace with the actual word you want to detect
        const responseMessage = 'FEUR !'; // Customize your response

        try {
            await message.channel.send(responseMessage);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
}
client.on('messageCreate', handleMessages);

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(TOKEN).catch((error) => {
    console.error('Login error:', error);
});


app.post('/interactions', verifyKeyMiddleware(PUBLIC_KEY), async (req, res) => {
    const interaction = req.body;

    if (interaction.type === InteractionType.APPLICATION_COMMAND) {
        console.log(interaction.data.name === 'quoi')
        if(interaction.data.name === 'quoi'){
            const gifUrl = 'https://tenor.com/view/feur-theobabac-quoi-gif-24294658'
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `
                    **FEUR  ${interaction.member.user.username} !**` + gifUrl,
                },
            });
        }

    }

});



app.get('/register_commands', async (req,res) =>{
    let slash_commands = [
        {
            "name": "quoi",
            "description": "FEUR !",
            "options": []
        }
    ]
    try
    {
        // api docs - https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
        let discord_response = await discord_api.put(
            `/applications/${APPLICATION_ID}/guilds/${GUILD_ID}/commands`,
            slash_commands
        )
        console.log(discord_response.data)
        return res.send('commands have been registered')
    }catch(e){
        console.error(e.code)
        console.error(e.response?.data)
        return res.send(`${e.code} error from discord`)
    }
})


app.get('/', async (req,res) =>{
    return res.send('Follow documentation ')
})


app.listen(8999, () => {

})

