import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minLength: 1,
            maxLength: 12,
        },
        
        password: {
            type: String,
            required: true,
            minLength: 8,
            maxLength: 16,
        },

        email: {
            type: String,
            unique: true,
            trim: true,
        },

    },

    {
        timestamps: true,
    }
)

export const User = mongoose.model("User", userSchema);