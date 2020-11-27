const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "tickle",
  description: "Tickle someone ﾍ(￣▽￣*)ﾉ",
  category: "action",
  usage:"tickle @user",
 run: async (bot, message) =>{
    const data = await fetch("https://nekos.life/api/v2/img/tickle").then((res) =>
      res.json()
    );
    const user = message.mentions.users.first() || message.author;
    const tickled = message.author.id === user.id ? "themselfs" : user.username;

    const embed = new MessageEmbed()
      .setTitle(`${message.author.username} Tickled ${tickled}`)
      .setFooter(message.author.username)
      .setColor("BLUE")
      .setDescription(`[Click here if the image failed to load.](${data.url})`)
      .setImage(`${data.url}`)
      .setTimestamp();

    message.channel.send(embed);
  },
};