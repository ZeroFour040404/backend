import { Router } from "express";
import { addSubject } from "../controllers/subject.control.js";

const subjectRouter = Router({ mergeParams: true });

subjectRouter.route('/:userId/addSubject').post(addSubject);

export default subjectRouter;