const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    // password: String
});
// under this strict line we did not want define name,age,..
// const studentSchema = new mongoose.Schema({},{strict: false})
module.exports = mongoose.model("student", studentSchema)