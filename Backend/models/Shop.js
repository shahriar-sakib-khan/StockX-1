import {model, Schema} from 'mongoose'

const shopSchema = new mongoose.Schema({
    shopOwner: {
        type: String,
        required: true
    },
    shopName: {
        type: String, 
        required: true,
        unique: true
    },
    shopLocation: {
        type: String,
        required: true,
    },
    shopCity: {
        type: String,
        required: true,
    },
    shopDivision: {
        type: String,
        required: true,
    }
}, {timestamps: true})

export default model("Shop", shopSchema)