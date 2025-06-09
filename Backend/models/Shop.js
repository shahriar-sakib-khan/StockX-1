import { Schema, model } from 'mongoose';

const shopSchema = new Schema(
    {
    name: {
        type: String,
        required: [true, 'Shop name is required'],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
        trim: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

export default model('Shop', shopSchema);
