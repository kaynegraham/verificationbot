const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')
const { guildinformation } = require('../../../config.json')
const { getsteamDetails } = require('../../util/getsteamDetails')

module.exports = async (client, interaction) => {
    const channel = client.channels.cache.get(guildinformation["logChannel"])
    if (!interaction.isModalSubmit()) return; 

    // Reply to the Modal
    if (interaction.customId === "verifymodal") {
        await interaction.reply({content: "Thank you, please wait as a staff member will verify you!", ephemeral: true})
    }

    // Get Data
    const charname =  interaction.fields.getTextInputValue('charactername') 
    const steamid =  interaction.fields.getTextInputValue('steamid')

    // Get Steam Details 
    const steamdata = await getsteamDetails(steamid)

    // Create Embed
    const LogEmbed = new EmbedBuilder()
    .setTitle(`Verification Required for ${interaction.user.username}`)
    .setThumbnail(interaction.user.avatarURL())
    .addFields(
        { name: "Steam Name:", value: steamdata.username, inline: true},
        { name: "Steam ID:", value: `${steamid}`, inline: true},
        { name: "Profile URL:", value: steamdata.profileurl, inline: true},
        { name: "User ID:", value: interaction.user.id, inline: true },
        { name: "Character Name:", value: charname, inline: true}
    )
    .setTimestamp()
    .setFooter({text: `${interaction.guild.name} © 2024`})

    // React to Button
    const ApproveButton = new ButtonBuilder()
     .setLabel("Approve Verification")
     .setCustomId("approveverify")
     .setStyle(ButtonStyle.Success)

    // Action Row
    const approverow = new ActionRowBuilder()
    .setComponents(ApproveButton)

    // Ping Staff & Send Verification Request
    channel.send({content: `@everyone`, embeds: [LogEmbed], components: [approverow]})
}