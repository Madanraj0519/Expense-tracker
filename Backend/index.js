require('dotenv').config();

const express = require("express");
const cors = require('cors');
const app = express();
const cookie = require("cookie-parser");
const mongoose = require("mongoose");
const { authRouter } = require('./Router/auth.router');
const { incomeRouter } = require('./Router/income.router');
const { ExpenseRouter } = require('./Router/expense.router');

const PORT = 8000;


app.use(express.json());
app.use(cors());
app.use(cookie());


mongoose.connect(process.env.MONGO_BD).then(() => {
    console.log("Database has been initialized successfully");
}).catch((err) => console.log(err));



const corsOptions = {
    origin: 'http://localhost:5173', // Your front-end URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true // Allow credentials
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions)); // Preflight response


app.get('/', (req, res) => {
    res.send({
        success : true,
        message : "Hello, world!"
    })
});

app.use('/api/auth', authRouter);
app.use('/api/income', incomeRouter);
app.use('/api/expense', ExpenseRouter);



app.listen(PORT, () => {
    console.log(`Hosting on port : http://localhost:${PORT}`);
});


