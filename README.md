# Async-Telegram-Bot-API-with-Node.js
Asynchronous Telegram Bot API with Node.js

##Purpose
This is a simple library wrapping the Telegram API and its functions for the purposes of exploring asynchronous execution with Telegram Bots.

##Dependencies
- Express.js
- Axios
- HTTP/HTTPS

##Notes
This project is an ongoing experiment with the Telegram Bot API using an asynchronous execution environment (Node.js) rather than the typical synchronous ennvironments familiar to me. Not surprisingly, asynchronous execution has posed significant challenges when state-dependent (think state machines, for example) operations are the norm. However, asynchronous execution would likely be desirable when bots are deployed with independent "one-shot" operations rather than complex interdependent operations. There are a wide variety of contexts that this would be an advantage, rather than a burden.
