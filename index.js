
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

const client = new Client({ intents: [Intents.FLAGS.GUILDS] }); // Specify GUILDS intent

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    const pingCommand = new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!');

    client.commands.set(pingCommand.name, pingCommand);

    client.interactions.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) return;

        const { commandName } = interaction;

        if (commandName === 'ping') {
            try {
                await interaction.reply('Pong!');
            } catch (error) {
                console.error(error);
            }
        }
    });
});

client.login('YOUR_BOT_TOKEN');



app.get('/', async (req,res) =>{
    return res.send('Follow documentation ')
})


app.listen(8999, () => {

})

