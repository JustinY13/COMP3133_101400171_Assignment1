const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const employeeSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, unique: true },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  designation: { type: String, required: true},
  salary: { type: Number, required: true, min: [1000, "Salary must be at greater than or equal to 1000"] },
  date_of_joining: { type: Date, required: true },
  department: { type: String, required: true},
  employee_photo: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});


employeeSchema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
});


const Employees = mongoose.model('Employees', employeeSchema);

module.exports = Employees;