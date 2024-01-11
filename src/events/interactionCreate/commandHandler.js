const getLocalCommands = require('../../util/getLocalCommands')
const chalk = require('chalk')

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try {
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName)

        if(!commandObject) return;

         if (commandObject.permissionsRequired?.length) {
            for (const permission of commandObject.permissionsRequired) {
              if (!interaction.member.permissions.has(permission)) {
                return interaction.reply({
                  content: 'Not enough permissions.',
                  ephemeral: true,
                });
              }
            }
          }

         await commandObject.callback(client, interaction);
    } catch(error) {
        console.log(chalk.bold.italic.red(`Command Handler: An Error has occured: ${error}`))
        console.log(error)
    }
}