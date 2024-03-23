import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRouter } from './routes/users.js';

const app = express();

// Middle-ware
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);


mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@recipes.allji6c.mongodb.net/recipes?retryWrites=true&w=majority&appName=${process.env.DATABASE}`)

app.listen(3001, () => {
    // console.log("user: ", process.env.USER)
    // console.log("password: ", process.env.PASSWORD)
    // console.log("database: ", process.env.DATABASE)
    console.log('Server started');
})