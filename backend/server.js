const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const morgan = require('morgan');
const apiRoutes = require("./routes/api")


//middleware
//receive JSON
app.use(express.json())
//Log incoming req to console
app.use(morgan('dev'));


//routes
app.get('/', (req, res) => {
    res.status(200).send('Server is live');
})

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
