import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/Users.js';

const router = express.Router();

const salt = 10;
const secret = process.env.SECRET;

router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    // check if user exists in db
    const user = await UserModel.findOne({ username: username });

    if (user) {
        return res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({ 
        username: username, 
        password: hashedPassword
    });

    await newUser.save();

    res.json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // check if user exists in db
    const user = await UserModel.findOne({ username: username });

    if (!user) {
        return res.json({ message: "User does not exist" });
    }

    // check password validity
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
        return res.json({ message: "Username or password is not valid" });
    }

    const token = jwt.sign({ id: user._id }, secret);
    res.json({ token, userID: user._id });
});





export { router as userRouter };