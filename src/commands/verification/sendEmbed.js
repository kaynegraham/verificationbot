const { PermissionFlagsBits, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    name: "sendembed",
    description: "Send the Verification Embed",
    permissionsRequired: [PermissionFlagsBits.Administrator],
    callback: async (client, interaction) => {
        try {
            // Make the Verify Embed
            const verifyembed = new EmbedBuilder()
                .setTitle(`${interaction.guild.name } | Verification`)
                .setDescription(`Click below to gain access to ${interaction.guild.name}`)
                .setThumbnail(interaction.guild.iconURL());
    
            // Make the Button
            const verifybutton = new ButtonBuilder()
            .setCustomId('verify')
            .setLabel('Become Verified!')
            .setStyle(ButtonStyle.Success)
    
            // Action Row 
            const row = new ActionRowBuilder()
            .setComponents(verifybutton)
    
            // Send Embed & Button
            await interaction.reply({ embeds: [verifyembed], components: [row]});
        } catch(e) {
            await interaction.editReply({content: `An error occured`, ephemeral: true})
            console.error("Error", e)
        }
    }
};