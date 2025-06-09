import {model, Schema} from 'mongoose'

const vehicleSchema = new Schema({
    vehicleName: {
        type: String,
        required: true
    },
    vehicleOwnerName: {
        type: String,
        required: true
    },
    vehicleCost: {
        type: Number,
        required: true
    }
})

export default model("Vehicle", vehicleSchema)