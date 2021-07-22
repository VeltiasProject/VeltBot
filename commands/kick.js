const Discord = require('discord.js');

module.exports = {
    name: "kick",
    description: "Kicks a member from the server",

    async run (client, message, args) {

        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('Tu n\'as pas la permission d\'utiliser ceci !')
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send('Je n\'ai pas la permission de kick cet utilisateur !')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('Merci de mentionner un utilisateur !');

        if(!member) return message.channel.send('Je ne trouve pas cet utilisateur sur ce serveur !');
        if(!member.kickable) return message.channel.send('Cette personne ne peux pas être kick !');

        if(member.id === message.author.id) return message.channel.send('Tu ne peux pas te kick toi même !');

        let reason = args.slice(1).join(" ");

        if(reason === undefined) reason = 'Non défini.';

        member.kick(reason)
        .catch(err => {
            if(err) return message.channel.send('Une erreur s\'est produite')
        })

        const kickembed = new Discord.MessageEmbed()
        .setTitle('Membre kick :')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('Utilisateur kick', member)
        .addField('Kick par', message.author)
        .addField('Raison', reason)
        .setFooter('Kick', client.user.displayAvatarURL())
        .setTimestamp()

        message.channel.send(kickembed);


    }
}