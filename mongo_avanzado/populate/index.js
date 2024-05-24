import mongoose from 'mongoose';
import __dirname from "./dirname.js"
import { studentModel } from './models/student.model.js';
import { courseModel } from './models/course.model.js';
const dbName = "colegio";
const connectionString = `mongodb+srv://admin:pabacs0214@cluster0.tqqey9a.mongodb.net/${dbName}`;

const environment = async () => {
    await mongoose.connect(connectionString);

    /*await studentModel.create({
        first_name: "Juan",
        last_name: "Perez",
        email: "jp@gmail.com",
        gener: "M",

    })*/

    /*await courseModel.create({
        title: "Back",
        description: "ss",
        difficulty: 5,
        topics: ["js"],
        profesor:"luis"
    })*/

    /*const student = await studentModel.findById("6648d1758704608289f6ccd8");

    student.courses.push({course:"6648d1538c09bf5ee93c79aa"});
    await student.save();*/

    /*const student = await studentModel.find({_id: "6648d1758704608289f6ccd8"}).populate("courses.course");
    console.log(JSON.stringify(student, null, "\t"));  */  

    /*const student = await studentModel.find({_id: "6648d1758704608289f6ccd8"}).populate("courses.course");
    console.log(JSON.stringify(student, null, "\t"));  */ 

    const student = await studentModel.find({_id: "6648d1758704608289f6ccd8"});
    console.log(JSON.stringify(student, null, "\t")); 

}

environment();