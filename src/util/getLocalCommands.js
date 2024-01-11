const path = require('path')
const getall = require('./getall')

module.exports = (exceptions) => {
    let localCommands = [];

    const commandCategories = getall(path.join(__dirname, "..", "commands"), true)

    for (const commandCategory of commandCategories) {
        const commandFiles = getall(commandCategory)
        
        for (const commandFile of commandFiles) {
            const commandObject = require(commandFile)
            localCommands.push(commandObject);
        }
    }

    return localCommands

}