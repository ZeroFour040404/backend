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
            user: { id: user._id, email: user.email, username: user.username },
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
            user: { id: user._id, email: user.email, username: user.username, }
        })
    }catch(error){
        response.status(500).json({ message: "Internal server error" })
    }
}

export { registerUser, loginUser };