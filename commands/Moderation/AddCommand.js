const Discord = require("discord.js");
const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class AddCommmand extends BaseCommand {
  constructor() {
    super(
      "add",
      "Moderation",
      ["addmember"],
      "Adds a member to a Channel.",
      "[command | alias] <@Member>",
      []
    );
  }

  async run(bot, message, args) {
    message.delete();
    if (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.channel.send(
        "You don't have permissions to use this command."
      );
    const member = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );

    if (!member) return message.channel.send("Provide a member.");
    message.channel
      .updateOverwrite(member, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true,
      })
      .then(() => message.channel.send(`Added ${member}!`));
  }
};
