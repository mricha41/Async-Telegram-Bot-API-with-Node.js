//test bot

const DataTypes = require("./lib/DataTypes")
const Bot = require("./lib/Bot")

//update as necessary
const hostname = '127.0.0.1'
const port = 80
const token = "YOURTELEGRAMBOTAPIKEYHERE"
var webhook = DataTypes.WebhookData;
webhook.url = "YOURWEBHOOKURLHERE"

var tg = new Bot(hostname, port, token)

function init() {
    return new Promise((resolve, reject) => {
        tg.deleteWebhook((err, res) => {
            console.log(res.data)
            if (res.status === 200) {
                console.log("Webhook deleted successfully...")
                tg.setWebhook(webhook, (err, res) => {
                    console.log(res.data)
                    if (res.status === 200) {
                        console.log("setWebhook(...) successful")
                        tg.getWebhookInfo((err, res) => {
                            console.log(res.data)
                            if (res.status === 200) {
                                console.log("getWebhookInfo(...) successful")
                                tg.getMe((err, res) => {
                                    console.log(res.data)
                                    if (res.status === 200) {
                                        console.log("getMe(...) successful")
                                        
                                        //resolution acheived once all operations complete
                                        resolve("Initialization complete...")
                                    } else {
                                        reject(new Error(`getMe(...) error: ${err}`))
                                    }
                                })
                            } else {
                                reject(new Error(`getWebhookInfo(...) error: ${err}`))
                            }
                        })
                    } else {
                        reject(new Error(`setWebhook(...) error: ${err}`))
                    }
                })
            } else {
                reject(new Error("Webhook could not be deleted: " + res.statusText))
            }
        })
        .catch((error) => {
            console.error(`Bot Reset failed: ${error}`)
        })
    })
}

init()
    .then(() => {
        tg.update("/", (err, req, res) => {
            console.log(res)
            if (err) {
                console.error(new Error(`Updates failed: ${err}`))
            } else {
                const currentUpdate = req.body["update_id"]
                const cmd = req.body["message"]["text"]
                //console.log("HTTP Verb: " + res.method + "\nStatus Code: " + res.status)
                console.log("Telegram update received: " + cmd)
                switch (cmd) {
                    case "/start":
                        {
                            if (currentUpdate !== tg.updateId) {
                                console.log(`Listening for Telegram updates at ${webhook.url}/`)
                                tg.chatId = req.body["message"]["chat"]["id"]
                                tg.firstUpdateId = currentUpdate
                                tg.updateId = currentUpdate
                                console.log("Current chat Id: " + tg.chatId)
                                console.log("First update Id: " + tg.firstUpdateId)
                                console.log("Current update Id: " + tg.updateId)
                                tg.sendMessage({ chat_id: tg.chatId, text: "Thank you for using " + tg.botData.first_name + " - salutations!" }, (err, res) => {
                                    console.log(res)
                                })
                                    .catch(err => {
                                        console.error(new Error(`Greeting message failed: ${err}`))
                                    })
                            } else {
                                console.log("Received duplicate update - no action taken.")
                            }
                        }
                        break;
                    default:
                        {
                            if (currentUpdate !== tg.updateId) {
                                tg.updateId = currentUpdate
                                console.log("Current update Id: " + tg.updateId)
                                console.log("Current count of received updates from Telegram: " + tg.updateReceivedCount)
                                tg.sendMessage({ chat_id: tg.chatId, text: "Invalid command! use '/help' to see a list of commands." }, (err, res) => {
                                    console.log(res)
                                })
                                    .catch(err => {
                                        console.error(new Error(`User-friendly /help prompt failed: ${err}`))
                                    })
                            } else {
                                console.log("Received duplicate update - no action taken.")
                            }
                        }
                        break;
                }
                console.log("Update received and handled successfully...")
                tg.updateReceivedCount = tg.updateReceivedCount + 1
            }
        })
    })

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
})

process.on('SIGTERM', () => {
    tg.closeServer()
})