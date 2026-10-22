import mongoose from "mongoose";
import { Subject } from "../models/subject.model.js";
import { User } from "../models/user.model.js";

const addSubject = async (request, response) => {
    console.log("This works");
    try{
        const { userId } = request.params;
        const { name, code, description } = request.body;  

        if(!mongoose.isValidObjectId(userId)){
            return response.status(400).json({ message: "Invalid user ID" });
        }

        if(!name){
            return response.status(400).json({ message: "Subject name is required" });
        }

        const user = await User.findById(userId);

        if(!user){
            return response.status(404).json({ message: "User has no match" });
        }

        const subject = await Subject.create({
            userId: userId,
            name: name,
            code: code,
            description: description
        });

        return response.status(201).json({ 
            message: "Subject created successfully",
            subject: { id: subject._id, name: subject.name, code: subject.code, description: subject.description }
        });
    }catch(error){
        return response.status(500).json({ message: "Internal server error" });
    }
}

const getSubject = async (request, response) => {
    console.log("Working");
    try{
        const { userId } = request.params;

        if(!mongoose.isValidObjectId(userId)){
            return response.status(400).json({ message: "Invalid user ID" });
        }

        const subjects = await Subject.find({ userId: userId });
        response.json({ subjects });


    }catch(error){
        response.status(500).json({ message: "Internal server error" });
    }
}

const updateSubject = async (request, response) => {
    try{
        const { userId, subjectId } = request.params;
        const { name, code, description } = request.body;

        if(!mongoose.isValidObjectId(userId)){
            return response.status(400).json({ message: "Invalid user ID" });
        }

        if(!mongoose.isValidObjectId(subjectId)){
            return response.status(400).json({ message: "Invalid subject ID" });
        }

        const user = await User.findById(userId);

        if(!user){
            return response.status(404).json({ message: "User not found" })
        }

        const payload = {};
        if(name !== undefined && name !== ""){
            payload.name = name;
        }
        if(code !== undefined && code !== ""){
            payload.code = code;
        }
        if(description !== undefined && description !== ""){
            payload.description = description;
        }

        const updatedSubject = await User.findByIdAndUpdate(
            subjectId, 
            { $set: payload },
            { returnDocument: "after", runValidators: true }
        );

        if(!updatedSubject){
            return response.status(404).json({ message: "Subject not found" });
        }

        return response.status(200).json({
            message: "Updated subject successfully",
            user: { id: updatedUser._id, name: updatedSubject.name, code: updatedSubject.code, description: updatedSubject.description}
        });

    }catch(error){
        response.status(500).json({ message: "Internal server error" });
    }
}

const deleteSubject = async (request, response) => {
    try{
        const { userId, subjectId } = request.params;
        const { password } = request.body;

        if(!mongoose.isValidObjectId(userId)){
            return response.status(400).json({ message: "Invalid user ID" });
        }

        if(!mongoose.isValidObjectId(subjectId)){
            return response.status(400).json({ message: "Invalid subject ID" });
        }

        const user = await User.findById(userId);

        if(!user){
            return response.status(404).json({ message: "User not found" })
        }

        if(!password){
            return response.status(404).json({ message: "Password is required" });
        }

        const isMatched = await user.comparePassword(password);
        if(!isMatched){
            return response.status(400).json({ message: "Incorrect password" })
        }

        const deletedSubject = await User.findByIdAndDelete(subjectId);
        
        if(!deletedSubject){
            return response.status(400).json({ message: "Deleted subject not found" });
        }
        
        return response.status(200).json({ 
            message: "Subject deleted",
            user: { username: deletedSubject.name, code: deletedSubject.code, description: deletedSubject.description }
        });


    }catch(error){
        response.status(500).json({ message: "Internal server error" });
    }
}

export { addSubject, getSubject, updateSubject, deleteSubject };