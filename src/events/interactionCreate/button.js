const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js')
const { guildinformation } = require('../../../config.json')

module.exports = async (client, interaction) => {

    switch (interaction.customId) {
        case "verify": { // Verify button
            return interaction.showModal(
                new ModalBuilder()
                .setCustomId("verifymodal")
                .setTitle("Enter your Details:")
                .addComponents(
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                            .setCustomId('charactername')
                            .setLabel("Enter your Character Name & Steam Name")
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                    ),
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                            .setCustomId('steamid')
                            .setLabel("Enter your 17 Digit Steam ID")
                            .setStyle(TextInputStyle.Short)
                            .setMinLength(17)
                            .setMaxLength(17)
                            .setRequired(true)
                    )
                )
            )
        }
        break;
        case "approveverify": {
            try {
                const charname = interaction.message.embeds[0].data?.fields[4].value;
                const userid = interaction.message.embeds[0].data?.fields[3].value;
                const member = await interaction.guild.members.fetch(userid)
                member.setNickname(charname)
                member.roles.add(guildinformation["verifyroleID"])
                interaction.reply({content: `Successfully updated ${member.displayName}'s Role & Nickname`})
            } catch(e) {
                console.error("Error", e)
            }
    
        }
        break;
    }
}