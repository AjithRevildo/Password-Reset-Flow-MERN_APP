const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./userRouter');
const morgan = require('morgan');
const cors = require('cors');


app.use(express.json());
app.use(morgan('dev'));

app.use(cors());

app.use('/api',userRouter);

app.listen(5000,()=>{
    console.log("localhost connect successfully");
})

mongoose.connect('mongodb://localhost:27017/userAuth',{useNewUrlParser: true},()=>{
    console.log("Server connected succesfully")
});