let student = [{
       id:"S001",
       name:"vicky",
       age:21
},
{
       id:"S002",
       name:"sriram",
       age:22
       
},
{
       id:"S003",
       name:"soooriya",
       age:24
}];
const getStudents = (req,res)=>{
 res.send({message:"hi this is GET method",student});
};
const createStudents = (req,res)=>{
    const newStudent = req.body;
       student.push(newStudent);
    res.send({message:' hii Post method',student}); 
};
const UpdateStudents = (req,res)=>{
    const findByStudentid = req.params.id;
       const updatedDetails = req.body;
       //s is the iterate value like individual student,if three students have means it will check 3  times 
       let studentToBeUpdated = student.find((s,i) => s.id ==findByStudentid);
       console.log(studentToBeUpdated);
       studentToBeUpdated.name = updatedDetails.name;
       studentToBeUpdated.age = updatedDetails.age;
    res.send({message:'hii PUT method'});
    
};
const deleteStudents = (req,res)=>{
       const studentId = req.params.id;
       let studentsAfterDeletion = student.filter((s,i) => s.id != studentId );
    res.send({message: 'hii Delete method',studentsAfterDeletion});
};
module.exports = {getStudents,createStudents,UpdateStudents,deleteStudents}

