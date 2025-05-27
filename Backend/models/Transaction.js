import {model, Schema} from 'mongoose'

const transactionSchema = new Schema({
    shopName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    due: {
        type: Number,
        required: true
    }
}, {timestamps: true})

export default model("Transaction", transactionSchema)