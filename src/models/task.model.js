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

        dueDate: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Task = mongoose.model("Task", taskSchema);