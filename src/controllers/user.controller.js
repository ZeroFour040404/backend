import mongoose from "mongoose";
import { User } from "../models/user.model.js";

const registerUser = async (request, response) => {
    try{
        const { username, email, password } = request.body;

        if(!username || !email || !password){
            return response.status(400).json({ message: "ALL FIELDS ARE REQUIRED" });
        }

        const existing = await User.findOne({ email: email.toLowerCase() });
        if(existing){
            return response.status(400).json({ message: "This user already exists"})
        }

        const user = await User.create({ 
            username: username,
            email: email.toLowerCase(),
            password: password,
            loggedIn: false,
        })

        response.status(201).json({ 
            message: "New user created",
            user: { id: user._id, email: user.email, username: user.username, passwrod: user.password },
        })
    }catch(error){
        response.status(500).json({ message: "Internal server error", error: error.message })
    }
}

const loginUser = async (request, response) => {
    try{
        const { email, password } = request.body;
        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        if(!user){
            return response.status(404).json({ message: "User not found" });
        }

        const isMatched = await user.comparePassword(password);
        if(!isMatched){
            return response.status(400).json({ message: "Incorrect password" })
        }

        response.status(200).json({ 
            message: "User authenticated" ,
            user: { id: user._id, email: user.email, username: user.username }
        });
    }catch(error){
        response.status(500).json({ message: "Internal server error" });
    }
}

const logoutUser = async (request, response) => {
    try{
        const { email } = request.body;
        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        if(!user){
            return response.status(404).json({ message: "User not found" });
        }

        response.status(200).json({
            message: "Logout successful",
            user: { id: user._id,  email: user.email }
        });
    }catch(error){
        response.status(500).json({ message: "Internal server error" });
    }
}

const updateUser = async (request, response) => {
    try{
        const { userId } = request.params;
        const { username, email } = request.body;

        if(!mongoose.isValidObjectId(userId)){
            return response.status(400).json({ message: "Invalid user ID" });
        }

        const user = await User.findById(userId);

        if(!user){
            return response.status(404).json({ message: "User has no match" });
        }

        const payload = {}
        if(username !== undefined && username !== ""){
            payload.username = username;
        }
        if(email !== undefined && email !== ""){
            payload.email = email;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { $set: payload },
            { returnDocument: "after", runValidators: true }
        );

        if(!updatedUser){
            return response.status(404).json({ message: "User not found" });
        }

        return response.status(200).json({
            message: "Updated user successfully",
            user: { id: updatedUser._id, username: updatedUser.username, email: updatedUser.email}
        });
        
    }catch(error){
        return response.status(500).json({ message: "Internal server error" });
    }
}

const updatePassword = async (request, response) => {
    try{
        const { userId } = request.params;
        const { newPassword } = request.body;

        if(!mongoose.isValidObjectId(userId)){
            return response.status(400).json({ message: "Invalid user ID" });
        }

        if(!newPassword){
            return response.status(404).json({ message: "New password is required" });
        }

        const user = await User.findById(userId);

        if(!user){
            return response.status(404).json({ message: "User has no match" });
        }

        user.password = newPassword;

        const updatedUser = await user.save();

        return response.status(200).json({ 
            message: "Password updated successfully",
            user: { id: user._id, password: user.password }
        });
    }catch(error){
        return response.status(500).json({ message: "Internal server error" });
    }
}

const deleteUser = async (request, response) => {
    try{
        const { userId } = request.params;
        const { password } = request.body;

        if(!mongoose.isValidObjectId(userId)){
            return response.status(400).json({ message: "Invalid user ID" });
        }

        const user = await User.findById(userId);

        if(!user){
            return response.status(400).json({ message: "User not found" });
        }

        if(!password){
            return response.status(404).json({ message: "Password in required" });
        }

        const isMatched = await user.comparePassword(password);
        if(!isMatched){
            return response.status(400).json({ message: "Incorrect password" })
        }

        const deletedUser = await User.findByIdAndDelete(userId);

        if(!deletedUser){
            return response.status(400).json({ message: "Deleted user not found" });
        }

        return response.status(200).json({ 
            message: "User deleted",
            user: { username: deletedUser.username, email: deletedUser.email }
        });
    }catch(error){
        return response.status(500).json({ message: "Internal server error" });
    }
}

export { registerUser, loginUser, logoutUser, updateUser, updatePassword, deleteUser };