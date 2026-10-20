import mongoose, { Schema } from "mongoose";

const subjectSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        code: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

export const Subject = mongoose.model("Subject", subjectSchema);