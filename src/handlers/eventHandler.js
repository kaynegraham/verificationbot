const getall = require("../util/getall");
const path = require('path')

module.exports = (pixr) => {
    const eventFolders = getall(path.join(__dirname, "..", "events"), true)
    
    for (const eventFolder of eventFolders) {
        const eventFiles = getall(eventFolder)
        eventFiles.sort((a, b) => a > b);
        const eventName = eventFolder.replace(/\\/g, '/').split('/').pop()
        
        pixr.on(eventName, async (arg) => {
            for (const eventFile of eventFiles) {
                const eventfunction = require(eventFile);
                await eventfunction(pixr, arg)
            }
        })
    }
};