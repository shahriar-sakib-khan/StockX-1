import { Schema, model } from "mongoose"

const cylinderSchema = new Schema({
    brandName: {
        type: String,
        required: true
    },
    connectorType: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    },
    stockCount: {
        type: Number,
        required: true
    },
    cylinderSize: {
        type: String,
        enum: ['Small', 'Medium', 'Large'],
        required: true
    },
    picture: {
        type: String,
        default: ""
    },
})

export default model("Cylinder", cylinderSchema)

