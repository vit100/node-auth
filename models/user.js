const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    require: true,

  }
});

userSchema.pre('save', async function(next){
  try {
    this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
  } catch (error) {
    next(error)    
  }
  next();
})

userSchema.methods={
  isPasswordValid: async function (password) {
   return await bcrypt.compare(password, this.password);
  }
};

const UserModel = mongoose.model('user', userSchema);


module.exports = UserModel;
