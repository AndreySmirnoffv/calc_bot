require('dotenv').config({path: "./assets/modules/.env"})
const TelegramRequest = require('node-telegram-bot-api')
const bot = new TelegramRequest(process.env.devStatus ? process.env.TEST_TOKEN : process.env.DEFAULT_TOKEN, {polling: true})
const {askDetails} = require('./assets/scripts/logic.js')


bot.on('message', async msg => {
    if(msg.text === "/start"){
        await askDetails(bot, msg)
    }
})


bot.on('polling_error', console.log)