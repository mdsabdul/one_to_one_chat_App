const mongoose = require('mongoose')
const plm = require("passport-local-mongoose")

const messageSchema = mongoose.Schema({
    receiver: String,
    sender: String,
    text: String
})
messageSchema.plugin(plm)

module.exports = mongoose.model('message', messageSchema)