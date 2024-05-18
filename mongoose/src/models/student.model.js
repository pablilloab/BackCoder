import mongoose from "mongoose";

//collection
const studentCollection = "students";

//modelo de dato
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  dni: { type: String, unique: true, required: true },
  course: { type: String, required: true },
  nota: { type: Number, required: true },
});

//Modelo para manejar estudiantes en MongoDB
export const studentModel = mongoose.model(studentCollection, studentSchema);
