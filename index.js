
// const { clientId, guildId, token, publicKey } = require('./config.json');
require('dotenv').config()
const APPLICATION_ID = process.env.APPLICATION_ID
const TOKEN = process.env.TOKEN
const PUBLIC_KEY = process.env.PUBLIC_KEY || 'not set'
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

const client = new Client({ intents: [Intents.FLAGS.MESSAGES] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
    if (message.content.toLowerCase() === 'quoi') {
        const gifUrl = 'https://tenor.com/view/feur-theobabac-quoi-gif-24294658';
        message.channel.send(`||**FEUR  ${message.author.username} !**||` + gifUrl);
    }
});

client.login(TOKEN);


app.get('/', async (req,res) =>{
    return res.send('Follow documentation ')
})


app.listen(8999, () => {

})

