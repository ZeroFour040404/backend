import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Subject } from "../models/subject.model.js";
import { Task } from "../models/task.model.js";

const addTask = async (request, response) => {
    try{
        const { userId, subjectId } = request.params;
        const { name, activityType, description, dueDate, status } = request.body;

        if(!mongoose.isValidObjectId(userId)){
            return response.status(400).json({ message: "Invalid user ID" });
        }

        if(!mongoose.isValidObjectId(subjectId)){
            return response.status(400).json({ message: "Invalid subject ID" });
        }

        if(!name || !activityType || !dueDate){
            return response.status(400).json({ message: "ALL FIELDS ARE REQUIRED" });
        }

        const user = await User.findById(userId);
        
        if(!user){
            return response.status(404).json({ message: "User has no match" });
        }

        const subject = await Subject.findById(subjectId);

        if(!subject){
            return response.status(404).json({ message: "Subject has no match" });
        }

        const task = await Task.create({
            userId: userId,
            subjectId: subjectId,
            name: name,
            activityType: activityType,
            description: description,
            dueDate: dueDate,
            status: status
        });
        
        return response.status(201).json({ 
            message: "Task created successfully",
            task: { id: task._id, name: task.name, activityType: task.activityType, description: task.description, dueDate: task.dueDate, status: task.status }
        });
    }catch(error){
        return response.status(500).json({ message: "Internal server error" });
    }
} 

const getTask = async (request, response) => {
    console.log("Working");
    try{
        const { userId, subjectId } = request.params;

        if(!mongoose.isValidObjectId(userId)){
            return response.status(400).json({ message: "Invalid user ID" });
        }

        if(!mongoose.isValidObjectId(subjectId)){
            return response.status(400).json({ message: "Invalid subject ID" });
        }

        const tasks = await Task.find({ userId: userId });

        return response.json({ tasks });
    }catch(error){
        response.status(500).json({ message: "Internal server error" });
    }
}

const getTaskPerSubject = async (request, response) => {
    console.log("Working");
    try{
        const { userId, subjectId } = request.params;

        if(!mongoose.isValidObjectId(userId)){
            return response.status(400).json({ message: "Invalid user ID" });
        }

        if(!mongoose.isValidObjectId(subjectId)){
            return response.status(400).json({ message: "Invalid subject ID" });
        }

        const tasks = await Task.find({ subjectId: subjectId });

        return response.json({ tasks });
    }catch(error){
        response.status(500).json({ message: "Internal server error" });
    }
}

const updateTask = async (request, response) => {
    try{
        const { userId, subjectId, taskId } = request.params;
        const { name, activityType, description, dueDate, status } = request.body;

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

        const subject = await Subject.findById(subjectId);

        if(!subject){
            return response.status(404).json({ message: "Subject not found" });
        }

        const task = await Task.findById(taskId);

        if(!task){
            return response.status(404).json({ message: "Task not found" });
        }

        const payload = {};
        if(name !== undefined && name !== ""){
            payload.name = name;
        }
        if(activityType !== undefined && activityType !== ""){
            payload.activityType = activityType;
        }
        if(description !== undefined && description !== ""){
            payload.description = description;
        }
        if(dueDate !== undefined && dueDate !== ""){
            payload.dueDate = dueDate;
        }
        if(status !== undefined && status !== ""){
            payload.status = status;
        }

        const updatedTask = await Task.findByIdAndUpdate(
            taskId, 
            { $set: payload },
            { returnDocument: "after", runValidators: true }
        );

        if(!updatedTask){
            return response.status(404).json({ message: "Task not found" });
        }

        return response.status(200).json({
            message: "Updated task successfully",
            user: { id: updatedTask._id, name: updatedTask.name, activityType: updatedTask.activityType, description: updatedTask.description, dueDate: updatedTask.dueDate, status: updatedTask.status }
        });
    }catch(error){
        response.status(500).json({ message: "Internal server error" });
    }
}

const updateTaskStatus = async (request, response) => {
    try{
        const { userId, subjectId, taskId } = request.params;
        const { status } = request.body;

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

        const subject = await Subject.findById(subjectId);

        if(!subject){
            return response.status(404).json({ message: "Subject not found" })
        }

        const task = await Task.findById(taskId);

        if(!task){
            return response.status(404).json({ message: "Task not found" });
        }

        const payload = {};
        if(status !== undefined && status !== ""){
            payload.status = status;
        }

        const updatedTask = await Task.findByIdAndUpdate(
            taskId, 
            { $set: payload },
            { returnDocument: "after", runValidators: true }
        );

        if(!updatedTask){
            return response.status(404).json({ message: "Task not found" });
        }

        return response.status(200).json({
            message: "Updated task successfully",
            user: { status: updateTask.status }
        });
    }catch(error){
        response.status(500).json({ message: "Internal server error" });
    }
}

const deleteTask = async (request, response) => {
    try{
        const { userId, subjectId, taskId } = request.params;
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

        const subject = await Subject.findById(subjectId);

        if(!subject){
            return response.status(404).json({ message: "Subject not found" })
        }

        const task = await Task.findById(taskId);

        if(!task){
            return response.status(404).json({ message: "Task not found" });
        }

        if(!password){
            return response.status(404).json({ message: "Password is required" });
        }

        const isMatched = await user.comparePassword(password);
        if(!isMatched){
            return response.status(400).json({ message: "Incorrect password" })
        }

        const deletedTask = await Task.findByIdAndDelete(taskId);
        
        if(!deletedTask){
            return response.status(400).json({ message: "Deleted subject not found" });
        }
        
        return response.status(200).json({ 
            message: "Subject deleted",
            user: { id: deletedTask._id, name: deletedTask.name, activityType: deletedTask.activityType, description: deletedTask.description, dueDate: deletedTask.dueDate, status: deletedtask.status }
        });


    }catch(error){
        response.status(500).json({ message: "Internal server error" });
    }
}




export { addTask, getTask, getTaskPerSubject, updateTask, updateTaskStatus, deleteTask };