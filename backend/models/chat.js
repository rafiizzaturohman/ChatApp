const { Schema, model } = require("mongoose");

const chatSchema = new Schema({
    message: String,
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    readstatus: {
        type: Boolean,
        default: false
    },
    date: String
}, { timestamps: true });

module.exports = model('Chat', chatSchema);