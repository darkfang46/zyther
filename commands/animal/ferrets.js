const { MessageEmbed } = require('discord.js');
const h2p = require('html2plaintext');
const fetch = require('node-fetch');

module.exports = {
	name: 'ferrets',
	category: 'animals',
	description: 'If you want some ferrets? Say no more!',
	aliases: [],
	usage: 'ferrets',
	run: async (client, message, args) => {
		const url = [
			'https://www.reddit.com/r/ferrets/hot.json',
		];

		let response;
		try {
			response = await fetch(url)
				.then(res => res.json())
				.then(json => json.data.children.map(v => v.data))
				.then(post => {
					const random = post[Math.floor(Math.random() * post.length) + 1];
					if(random.is_video === true || !random.url.endsWith('jpg')) {
						return message.channel.send(
							':x: An error occured, please try again!',
						);
					}
					const embed = new MessageEmbed()
						.setColor('BLUE')
						.setURL(`https://www.reddit.com/r/${random.subreddit}/comments/${random.id}`)
						.setTitle(h2p(random.title))
						.setImage(random.url)
						.setFooter(`👍 ${random.ups} | 💬 ${random.num_comments}`);

					message.channel.send(embed);
				});
		}
		catch (e) {
			return message.channel.send(
				':x: An error occured, please try again!',
			);
		}
	},
};