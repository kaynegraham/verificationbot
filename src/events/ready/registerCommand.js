const chalk = require('chalk')
const getLocalCommands = require('../../util/getLocalCommands');
const getAppCommands = require('../../util/getAppCommands');
const commandDifferent = require('../../util/commandDifferent');

module.exports = async (client) => {
    try {
        const {  guildinformation } = require('../../../config.json')
        const localCommands = getLocalCommands();
        const appCommands = await getAppCommands(client, guildinformation["guildid"])

        for (const localCommand of localCommands) {
            const { name, description } = localCommand

            const existingCommand = await appCommands.cache.find((cmd) => cmd.name === name );

            if (existingCommand) {
                if (localCommand.deleted) {
                    await appCommands.delete(existingCommand.id)
                    console.log(chalk.bold.red(`Command: ${name} was deleted successfully`))
                    continue;
                }

                if (commandDifferent(existingCommand, localCommand)) {
                    await appCommands.edit(existingCommand.id, {
                        description
                    })
                    console.log(chalk.bold.italic.green(`Edited Command: ${name}`))
                }
            } else {
                if (localCommand.deleted) {
                    console.log(chalk.bold.red("We are not going to register this command as it is set to be deleted"))
                    continue;
                }

                await appCommands.create({
                    name,
                    description
                })
                console.log(chalk.bold.green(`Command: ${name} was registered!`))
            }
        }

    } catch (error) {
        console.log(chalk.bold.italic.red(`Register Command: There was an error ${error}`))
    }
}