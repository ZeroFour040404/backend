import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: true,
            index: true
        },

        name: {
            type: String,
            trim: true,
            required: true,
            maxLength: 12
        },

        activityType: {
            type: String,
            required: true,
            default: "actvity"
        },

        description: {
            type: String,
            default: ""
        },

        dueDate: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            default: "unfinished",
        }
    },
    {
        timestamps: true
    }
);

export const Task = mongoose.model("Task", taskSchema);