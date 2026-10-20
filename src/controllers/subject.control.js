import mongoose from "mongoose";
import { Subject } from "../models/subject.model.js";
import { User } from "../models/user.model.js";

const addSubject = async (request, response) => {
    console.log("This works");
    try{
        const { userId } = request.params;
        const { name, code } = request.body;  

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
            code: code
        });

        return response.status(201).json({ 
            message: "Subject created successfully",
            subject: { name: name, code: code }
        });
    }catch(error){
        return response.status(500).json({ message: "Internal server error" });
    }
}

export { addSubject };