const { Schema } = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    chats: [{
        type: Schema.Types.ObjectId,
        ref: "Chat"
    }],
    token: {
        type: String,
        default: null
    }
});

userSchema.pre('findOneAndDelete', function (next) {
    Chat.deleteMany({ sender: this._conditions._id }).exec();
    next();
})

module.exports = model('User', userSchema);