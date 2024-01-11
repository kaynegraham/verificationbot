const axios = require('axios')
const { steaminformation } = require('../../config.json')

const getsteamDetails = async (steamid) => {
    try {
        const response = await axios.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steaminformation["steamapikey"]}&format=json&steamids=${steamid}`);
        const data = response.data?.response.players[0];

        if (data && data.personaname && data.profileurl) {
            const username = data.personaname;
            const profileurl = data.profileurl;
            return { username, profileurl };
        } else {
            throw new Error('Invalid or missing data from Steam API');
        }
    } catch (error) {
        throw new Error('Error fetching Steam details:', error.message);
    }
};

module.exports = { getsteamDetails };
