const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const morgan = require('morgan');
const apiRoutes = require("./routes/api")
const User = require("./models/UserModel")
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: '8h' });
}

//middleware
//receive JSON
app.use(express.json())
//Log incoming req to console
app.use(morgan('dev'));


//routes
app.get('/', (req, res) => {
    res.status(200).send('Server is live');
})

app.post('/register', async (req, res) => {
    const { name, username, password, hospitals } = req.body;
    try {
        const user = await User.signup(name, username, password, hospitals);
        res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        //TODO: CHECK TOKEN / TOKENLOGIN??
        const user = await User.login(username, password);
        //TODO: Add Token
        res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

//ADD TOKEN CHECKING FROM THIS POINT

app.use('/api/', apiRoutes);

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Database connected');

        app.listen(port, () => {
            console.log(`Server is live on http://localhost:${port}`);
            console.log(`http://localhost:${port}`);
        })
    })
    .catch((err) => console.log(err))
