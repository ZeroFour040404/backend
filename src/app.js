import express from 'express';

const app = express();
app.use(express.json());

import router from './routes/user.route.js';

app.use("api/v1/users", router);

// example route: http://localhost:5000/api/v1/users/register

export default app;