import { Router } from "express";
import { addSubject, getSubject, updateSubject } from "../controllers/subject.control.js";

const subjectRouter = Router({ mergeParams: true });

subjectRouter.route('/:userId/subjects/addSubject').post(addSubject);
subjectRouter.route('/:userId/subjects/getSubject').get(getSubject);

subjectRouter.route('/:userId/subjects/:subjectId/updateSubject').patch(updateSubject);

export default subjectRouter;