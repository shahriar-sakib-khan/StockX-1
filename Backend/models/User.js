import {model, Schema} from 'mongoose'

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true,
        min: 8 
    }, 
    profileImage: {
        type: String,
        default: ""
    }
}, {timeStamps: true})

export default model("User", userSchema)