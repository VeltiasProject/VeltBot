 const Discord = require('discord.js');

const client = new Discord.Client();

const { token } = require('./config.json');

const { readdirSync } = require('fs');

const { join } = require('path');

client.commands= new Discord.Collection();

const prefix = ';';
//You can change the prefix if you like. It doesn't have to be !


const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}

client.on('message', msg => { if (msg.content.includes('discord.gg/') || msg.content.includes('https://discord.gg/')) return msg.delete() });
    


client.on("error", console.error);

client.on('ready', () => {
    console.log('Je suis prêt !');
    client.user.setStatus(`dnd`)
});



client.login(process.env.BOT_TOKEN);
