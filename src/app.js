import express from 'express';

const app = express();
app.use(express.json());

import userRouter from './routes/user.route.js';

app.use("/api/users", userRouter);

// example route: http://localhost:4000/api/v1/users/register

import subjectRouter from "./routes/subject.route.js";

app.use("/api/users", subjectRouter);

export default app;