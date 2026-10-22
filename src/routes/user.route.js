import { Router } from "express";
import { loginUser, registerUser, logoutUser, updateUser, updatePassword, deleteUser }  from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').post(logoutUser);

userRouter.route('/:userId/updateUser').patch(updateUser);
userRouter.route('/:userId/updatePassword').patch(updatePassword);
userRouter.route('/:userId/deleteUser').delete(deleteUser);

export default userRouter;