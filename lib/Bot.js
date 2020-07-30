const http = require('http')
const https = require('https')
const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const DataTypes = require("../lib/DataTypes")

class Bot {
    constructor(h, p, token) {
        //member data
        this.hostname = h
        this.port = p
        this.botToken = token
        this.chatId = null
        this.firstUpdateId = null
        this.updateId = null
        this.messageId = null
        this.botData = null
        this.webhookData = null
        this.updateReceivedCount = 0

        //set up both servers for
        //sending and receiving data
        this.app = express()

        this.app.use(
            bodyParser.urlencoded({
                extended: true
            })
        )
        this.app.use(bodyParser.json())

        this.server = https.createServer((req, res) => {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/plain')
        })

        this.server.listen(this.port, this.hostname, () => {
            console.log(`Bot Server listening on ${this.hostname}:${this.port}`)
        })

        this.app.listen(this.port)
    }

    update(path, receiveUpdates) {
        //listen for updates via POST request
        //from Telegram using express
        return new Promise((resolve, reject) => {
            this.app
                .post(path, (req, res) => {
                    receiveUpdates(null, req, res)
                })
                .on("error", error => {
                    receiveUpdates(error)
                })
        })
    }

    setWebhook(data, callback) {
        return axios
            .post('https://api.telegram.org/bot' + this.botToken + '/setWebhook', data)
            .then((res) => {
                this.webhookData = data
                callback(null, res)
            })
            .catch(error => {
                callback(error)
            })
    }

    getWebhookInfo(callback) {
        return axios
            .post('https://api.telegram.org/bot' + this.botToken + '/getWebhookInfo', {

            })
            .then((res) => {
                callback(null, res)
            })
            .catch(error => {
                callback(error)
            })
    }

    deleteWebhook(callback) {
        return axios
            .post('https://api.telegram.org/bot' + this.botToken + '/deleteWebhook', {

            })
            .then((res) => {
                callback(null, res)
            })
            .catch(error => {
                callback(error)
            })
    }

    getMe(callback) {
        return axios
            .post('https://api.telegram.org/bot' + this.botToken + '/getMe', {
                
            })
            .then((res) => {
                this.botData = res.data["result"]
                callback(null, res)
            })
            .catch(error => {
                callback(error)
            })
    }

    setMyCommands(commands, callback) {
        return axios.post('https://api.telegram.org/bot' + this.botToken + '/setMyCommands', commands)
            .then((res) => {
                callback(null, res)
            })
            .catch(error => {
                console.error(`Error: ${error}`)
                callback(error)
            })
    }

    sendDice(callback) {
        return axios.post('https://api.telegram.org/bot' + this.botToken + '/sendDice', {
                chat_id: this.chatId
            })
            .then((res) => {
                callback(null, res)
            })
            .catch(error => {
                if (error.response) {
                    console.error(`Error in client response: ${error}`)
                } else if (error.request) {
                    console.error(`Error in request, no client response received: ${error}`)
                } else {
                    console.error(`Error: ${error}`)
                }
                callback(error)
            })
    }

    sendMessage(msg, callback) {
        return axios.post('https://api.telegram.org/bot' + this.botToken + '/sendMessage', msg)
            .then((res) => {
                callback(null, res)
            })
            .catch(error => {
                if (error.response) {
                    console.error(`Error in client response: ${error}`)
                } else if (error.request) {
                    console.error(`Error in request, no client response received: ${error}`)
                } else {
                    console.error(`Error: ${error}`)
                }
                callback(error)
            })
    }

    closeServer(callback) {
        this.server.close(() => {
            console.log("Process terminated.")
        })
    }
}

module.exports = Bot