// Express
const express = require("express");
// Cors
const cors = require("cors");
// Mongoose
const mongoose = require("mongoose");
// User Model
const user = require("./models/user");
// User Model
const post = require("./models/post");
// Bcryptjs
const bcryptjs = require("bcryptjs");
const bcryptjsSalt = bcryptjs.genSaltSync(10);
// JSONWebToken
const jwt = require("jsonwebtoken");
const jwtSecret = "12155sdfd";
// Cookie Parser
const cookieParser = require("cookie-parser");
// Multer Middleware
const multer = require("multer")
const uploadMiddleware = multer({ dest: "uploads/" });
// File System
const fs = require("fs");
// Create App
const app = express();
// Use Cors
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
// Use Express JSON
app.use(express.json());
// Use Cookie Parser
app.use(cookieParser());
// Static Serve
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, "uploads")));
// Connect Mongoose
mongoose.connect("mongodb+srv://devmr:Devmrqwer1234@cluster0.6cliwmu.mongodb.net/?retryWrites=true&w=majority");
// Register Route
app.post("/api/v1/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDocs = await user.create({
            username,
            password: bcryptjs.hashSync(password, bcryptjsSalt)
        })
        res.status(201).json({ message: "Successfully Registered", data: userDocs });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
});
// Login Route
app.post("/api/v1/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDocs = await user.findOne({ username });
        let checkPass = bcryptjs.compareSync(password, userDocs.password);
        if (checkPass) {
            jwt.sign({ username, id: userDocs._id }, jwtSecret, {}, (error, token) => {
                if (error) {
                    res.status(403).json({ message: error });
                } else {
                    res.cookie("token", token).status(200).json({ message: "Successfully Loggedin", data: { username, id: userDocs._id } });
                }
            })
        } else {
            res.status(404).json({ message: "Credentails Incorrect" });
        }
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
})
// Profile Route
app.get("/api/v1/profile", (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, (error, info) => {
        if (error) {
            res.json(error);
        } else {
            res.status(200).json(info);
        }
    })
})
// Logout Route
app.post("/api/v1/logout", (req, res) => {
    res.cookie("token", null).status(200).json({ message: "Successfully Logout" });
})
// Post Create Route
app.post("/api/v1/blog/add", uploadMiddleware.single('file'), async (req, res) => {
    const { title, excerpt, content } = req.body;
    const { originalname, path } = req.file;
    const part = originalname.split(".");
    const ext = part[1];
    const newFile = `${path}.${ext}`;
    fs.renameSync(path, newFile);

    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (error, info) => {
        if (error) {
            res.json({ message: error });
        } else {
            const postDocs = await post.create({
                title, excerpt, content, file: newFile.replace("\\", "/"), author: info.id
            })
            res.status(201).json({ message: "Successfully Create", data: postDocs });
        }
    })
})
// Post Route
app.get("/api/v1/blogs", async (req, res) => {
    try {
        const postDocs = await post.find().populate("author", ["username"]);
        res.status(200).json({ message: "Successfully Read All", data: postDocs });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
})
// Single Post Route
app.get("/api/v1/single/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const postDocs = await post.findById(id).populate("author", ["username"]);
        res.status(200).json({ message: "Successfully Read", data: postDocs });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
})
// Post Create Route
app.put("/api/v1/edit/:id", uploadMiddleware.single('file'), async (req, res) => {
    const { id } = req.params;
    const { title, excerpt, content } = req.body;

    let newFile = null;

    if (req.file) {
        const { originalname, path } = req.file;
        const part = originalname.split(".");
        const ext = part[1];
        newFile = `${path}.${ext}`;
        fs.renameSync(path, newFile);
    }

    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (error, info) => {
        if (error) {
            res.json({ message: error });
        } else {
            const postDocs = await post.findById(id);
            const isAuthor = JSON.stringify(postDocs.author) === JSON.stringify(info.id);
            if (isAuthor) {
                let newPost = await post.findByIdAndUpdate(id, {
                    title, excerpt, content, file: newFile ? newFile : postDocs.img, author: info.id
                }, { new: true })
                res.status(200).json({ message: "Successfully Updated", data: newPost });
            } else {
                res.status(400).json({ message: "You are not Author" });
            }
        }
    })
})
// Create Server
app.listen(9000, async () => {
    console.log("Server is Running Port http://localhost:9000");
});