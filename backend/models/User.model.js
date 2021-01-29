const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: { type: String, required: true},
  lastname: { type: String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true},
  mobile: { type: String, required: true,minlength: 11},
}, {
  timestamps: true,
});

const User = mongoose.model('user', userSchema);

module.exports = User;