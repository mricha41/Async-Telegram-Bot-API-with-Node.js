//See Telegram API documentation
//https://core.telegram.org/bots/api
//available types and methods for more
//information about these types. Dokkaebi
//data types mirror what Telegram expects
//to receive via requests and what Telegram
//posts to a webhook or a call to /getUpdates

var BotData = {
    id: "",
    is_bot: true,
    first_name: "",
    username: "",
    can_join_groups: false,
    can_read_all_group_messages: false,
    supports_inline_queries: false
}

var WebhookData = {
    url: "",
    certificate: "",
    max_connections: 40,
    allowed_updates: null
}

var CommandData = {
    command: "",
    description: ""
}

var MessageData = {
    chat_id: null,
    text: null,
    parse_mode: null,
    disable_web_page_preview: false,
    disable_notification: false,
    reply_to_message_id: false,
    reply_markup: false
}

//expects 2D array of InlineKeyboardButtonData
var InlineKeyboardMarkupData = {
    inline_keyboard: null
}

var InlineKeyboardButtonData = {
    text: "",
    url: "",
    login_url: null,
    callback_data: "",
    switch_inline_query: "",
    switch_inline_query_current_chat: "",
    callback_game: null,
    pay: false
}

var ReplyKeyboardMarkupData = {
    keyboard: null,
    resize_keyboard: false,
    one_time_keyboard: false,
    selective: false
}

var KeyboardButtonData = {
    text: "",
    request_contact: false,
    request_location: false,
    request_poll: null
}

var KeyboardButtonPollTypeData = {
    type: ""
}

module.exports = {
    BotData,
    WebhookData,
    MessageData,
    InlineKeyboardMarkupData,
    InlineKeyboardButtonData,
    ReplyKeyboardMarkupData,
    KeyboardButtonData,
    KeyboardButtonPollTypeData
}