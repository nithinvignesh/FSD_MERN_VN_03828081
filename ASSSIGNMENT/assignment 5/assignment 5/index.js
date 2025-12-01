const express = require('express');
const app = express();
const mongoose = require('mongoose')
const port = 8000;
// const middleware = require('./middleware/customMiddleware')
mongoose.connect("mongodb+srv://admin:admin@cluster0.kpv8cmh.mongodb.net/?appName=Cluster0")
.then(()=>{
       console.log("connected to db");
})
.catch((err)=>{
       console.log(err);
});
const userRouter = require("./routes/route")
//middleware for converting json object to javascript object
app.use(express.json());
// app.use(middleware);
app.use(userRouter);

app.listen(port,()=>{
       console.log(`server running in http://localhost:${port}`);
})
 