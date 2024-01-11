const chalk = require('chalk')

module.exports = (client) => {
    console.log(chalk.bold.italic.magenta(`${client.user.displayName} has been started..`))
}