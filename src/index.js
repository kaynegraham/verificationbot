const { GatewayIntentBits, Client} = require('discord.js')
const eventHandler = require('./handlers/eventHandler')
const { botinformation } = require('../config.json')

// Create New Client
const client = new Client({
    intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers]
})

// Load Events
eventHandler(client)

// Login to Bot
client.login(botinformation["token"])