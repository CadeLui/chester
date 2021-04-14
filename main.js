const Discord = require('discord.js');
const dotenv = require('dotenv');
const client = new Discord.Client();
dotenv.config();

client.on("ready", () => {
    console.log("E7 -> E5");
});

client.on("message", msg => {
    if (!msg.content.startsWith("."))
    {
        return;
    }
});

client.login(process.env.TOKEN);