/*
A chess bot for the chat program Discord
written by Cade Luinenburg
Libraries written by Amish Shah and Max Beatty
*/

const Discord = require('discord.js');
const dotenv = require('dotenv');
const chess = require('./chess.js');
const client = new Discord.Client();
dotenv.config();

client.on("ready", () => {
    console.log("E7 -> E5");
});

client.on("message", msg => {
    if (!msg.content.startsWith("."))
        return;
    
    if (msg.content.startsWith(".showBoard"))
    {

    }
});

client.login(process.env.TOKEN);