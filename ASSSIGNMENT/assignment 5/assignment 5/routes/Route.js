const express = require('express');
const userRouter = express.Router();
const {getStudents,createStudents,UpdateStudents,deleteStudents} = require("../controller/control");
// const customMiddleware = require("../middleware/customMiddleware")
userRouter.get("/get-method",getStudents);
userRouter.post('/post-method',createStudents);
userRouter.put('/put-method/:id',UpdateStudents);
userRouter.delete('/delete-method/:id',deleteStudents);
// const {insertUser,getUser, updateUser,deleteUser, loginUser, registerUser} = require("../controller/studentController")

// userRouter.post("/user",insertUser)
// userRouter.get("/getuser",getUser)
// userRouter.put("/updateuser/:name",updateUser)
// userRouter.delete("/deleteuser/:name",deleteUser)
// userRouter.post("/loginuser",loginUser)
// userRouter.post("/registeruser",registerUser)
module.exports = userRouter;