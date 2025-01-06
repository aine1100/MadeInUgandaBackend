const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  phoneNumber: {
    type: String,
    unique: true, // Ensures uniqueness
    required: true, // Ensures it's always provided
  },
  totalProducts:{
    type:Number,
    default:0
  },
  totalIncome:{
    type:Number,
    default:0
  },
  totalSales:{
    type:Number,
    default:0
  }
});

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

module.exports = mongoose.model('User', userSchema);
