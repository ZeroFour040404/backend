import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

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

userSchema.pre("save", async function(){
    if(!this.isModified("password")){
        return;
    }
    this.password = await bcrypt.hash(this.password, 16);
});

userSchema.methods.comparePassword = function (password){
    return bcrypt.compare(password, this.password);
}


export const User = mongoose.model("User", userSchema);