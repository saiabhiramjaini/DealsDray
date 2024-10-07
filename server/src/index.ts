import express, {Express} from 'express';
import cors from 'cors';
import connectDB from './db/connect';
import loginRouter from './routes/loginRoutes';
import employeeRouter from './routes/employeeRoutes';
require('dotenv').config();

const app= express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', loginRouter);
app.use('/api/v1/employee', employeeRouter);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});