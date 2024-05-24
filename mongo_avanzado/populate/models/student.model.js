import mongoose  from "mongoose";

const studentCollection = "students";

const studentSchema = new mongoose.Schema({
    first_name: String,
    last_name : String,
    email: String,
    gender: String,
    courses: {
        type: [{ course: { type: mongoose.Schema.Types.ObjectId, ref: "courses"}}] //le digo que el curso vas a ser un ObjectId para referenciar
    }
});

//middleware para popular los cursos
studentSchema.pre("find", function(){
    this.populate("courses.course")
});

export const studentModel = mongoose.model(studentCollection, studentSchema);