const Discord = require('discord.js');

module.exports = {
    name: "ban",
    description: "Kicks a member from the server",

    async run (client, message, args) {

        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('Tu n\'as pas la permission d\'utiliser ceci !')
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('Je n\'ai pas la permission de bannir cet utilisateur !')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('Merci de mentionner un utilisateur !');

        if(!member) return message.channel.send('Je ne trouve pas cet utilisateur sur ce serveur !');
        if(!member.bannable) return message.channel.send('Cette personne ne peux pas être banni.');

        if(member.id === message.author.id) return message.channel.send('Tu ne peux pas te bannir toi même !');

        let reason = args.slice(1).join(" ");

        if(reason === undefined) reason = 'Non définie.';

        member.ban(reason)
        .catch(err => {
            if(err) return message.channel.send('Une erreur s\'est produite')
        })

        const banembed = new Discord.MessageEmbed()
        .setTitle('Membre Banni :')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('Utilisateur banni', member)
        .addField('Banni par', message.author)
        .addField('Raison', reason)
        .setFooter('Temps du ban', client.user.displayAvatarURL())
        .setTimestamp()

        message.channel.send(banembed);


    }
}