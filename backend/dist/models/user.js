import mongoose from "mongoose";
import chatSchema from "./chat.js";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    chats: [chatSchema]
});
export default mongoose.model('User', userSchema);
//# sourceMappingURL=user.js.map