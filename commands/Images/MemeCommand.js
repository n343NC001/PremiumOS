const Discord = require("discord.js")
const fs = require('fs')
const fetch = require('node-fetch')
const BaseCommand = require('../../utils/structures/BaseCommand')
const {
    MessageEmbed
} = require('discord.js')
const Theme = require('../../Database/models/Theme')

module.exports = class MemeCommmand extends BaseCommand {
    constructor() {
        super('meme', 'Images', ['fun', 'm'], 'Shows Random Memes', '[command | alias]', [])
    }

    async run(bot, message, args) {
        let theme = await Theme.findOne({
            where: {
                guildId: message.guild.id,
                botId: bot.user.id
            }
        })

        let awaitEmbed = new MessageEmbed()
            .setAuthor("Please wait...", bot.user.displayAvatarURL())
            .setColor(theme.dataValues.embedTheme)
        let msg = await message.channel.send(awaitEmbed)

        fetch(`https://apis.duncte123.me/meme`)
            .then(res => res.json()).then(body => {
                if (!body) return message.channel.send("Error! Please try again..")
                let alpacaEmbed = new MessageEmbed()
                    .setAuthor("MEME", message.author.avatarURL())
                    .setColor(theme.dataValues.embedTheme)
                    .setImage(body.data.image);
                msg.edit(alpacaEmbed)
            })
    }
}