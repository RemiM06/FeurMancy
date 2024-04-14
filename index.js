
// const { clientId, guildId, token, publicKey } = require('./config.json');
require('dotenv').config()
const APPLICATION_ID = process.env.APPLICATION_ID
const TOKEN = process.env.TOKEN
const PUBLIC_KEY = process.env.PUBLIC_KEY || 'is set'
const GUILD_ID = process.env.GUILD_ID


const axios = require('axios')
const express = require('express');
const { InteractionType, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions');


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

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


client.on('message', message => {
    // Vérifier si le message provient d'un utilisateur et n'est pas du bot lui-même
    if (!message.author.bot) {
        // Vérifier si le message contient le mot "quoi"
        if (message.content.toLowerCase().includes('quoi')) {
            // Répondre avec "feur"
            message.channel.send('feur');
        }
    }
});

client.login(TOKEN);

app.post('/interactions', verifyKeyMiddleware(PUBLIC_KEY), async (req, res) => {
    const interaction = req.body;

    if (interaction.type === InteractionType.APPLICATION_COMMAND) {
        console.log(interaction.data.name)
        if(interaction.data.name == 'quoi'){
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE, 
                data: {
                    content: `FEUR ${interaction.member.user.username}!`,
                },
            });
        }

    }

});



app.get('/register_commands', async (req,res) =>{
    let slash_commands = [
        {
            "name": "yo",
            "description": "replies with Yo!",
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