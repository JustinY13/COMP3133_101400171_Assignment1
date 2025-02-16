const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});


userSchema.pre('save', async function (next) {
    this.updated_at = new Date(); 
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Use the bcrypt.compare function to validate the hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};


const Users = mongoose.model('Users', userSchema);

module.exports = Users;
