const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const path = require('path')
const UserModel = require('./models/UserModel')
const PostModel = require('./models/PostModel')

const app = express()

app.use(express.json())

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(cookieParser())
app.use(express.static('public'))

mongoose.connect('mongodb://localhost:27017/blog');

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json("The token is missing");
    } else {
        jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
            if (err) {
                return res.json("The token is wrong");
            } else {
                req.email = decoded.email;
                req.username = decoded.username;
                next();
            }
        });
    }
};

app.get('/', verifyUser, (req, res) => {
    return res.json({ email: req.email, username: req.username });
});

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new UserModel({
            username, email, password: hashedPassword,
        });

        // Save the user to the database
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Password is incorrect' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { email: user.email, username: user.username },
            'jwt-secret-key',
            { expiresIn: '1d' }
        );

        res.cookie('token', token, { httpOnly: true });
        res.json({ message: 'Success' });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

app.post('/create', verifyUser, upload.single('file'), async (req, res) => {
    try {
        const result = await PostModel.create({
            title: req.body.title,
            description: req.body.description,
            file: req.file.filename,
            email: req.body.email
        });
        res.json("success")
    } catch (err) {
        res.json(err);
    }
});

app.get('/getposts', async (req, res) => {
    try {
        const posts = await PostModel.find();
        res.json(posts);
    } catch (err) {
        res.json(err);
    }
});

app.get('/getpostbyid/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const post = await PostModel.findById({ _id: id });
        res.json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching post by ID' });
    }
});

app.put('/editpost/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const result = await PostModel.findByIdAndUpdate(
            { _id: id },
            {
                title: req.body.title,
                description: req.body.description
            }
        );
        res.json("success");
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error updating post', error: err });
    }
});

app.delete('/deletepost/:id', (req, res) => {

    PostModel.findByIdAndDelete({ _id: req.params.id })
        .then(result => res.json("success"))
        .catch(err => console.log(err))
})

app.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json("success")
})

app.listen(3001, () => {
    console.log("Server is running")
})
