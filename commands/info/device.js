const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'device',
	category: 'info',
	description: 'Tells you which devices a user is on.',
	usage: 'device <member>',
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setTitle(`${member.user.username}'s device`)
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp();

		if (member.presence.clientStatus.mobile) {
			embed.addFields([
				{ name: '📱 Mobile', value:':online:', inline: true },
				{ name: '🖥 Desktop', value:':offline:', inline: true },
				{ name: '🌐 Web', value:':offline:', inline: true },
			]);
		}
		else if (member.presence.clientStatus.desktop) {
			embed.addFields([
				{ name: '📱 Mobile', value:':offline:', inline: true },
				{ name: '🖥 Desktop', value:':online:', inline: true },
				{ name: '🌐 Web', value:':offline:', inline: true },
			]);
		}
		else if (member.presence.clientStatus.web) {
			embed.addFields([
				{ name: '📱 Mobile', value:':offline:', inline: true },
				{ name: '🖥 Desktop', value:':offline:', inline: true },
				{ name: '🌐 Web', value:':online:', inline: true },
			]);
		}


		message.channel.send(embed);
	},
};