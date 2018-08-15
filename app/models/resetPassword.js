'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let resetPasswordSchmea = new Schema({
   userId: {
    type: String
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  email: {
    type: String,
    default: ''
  },
  


})


mongoose.model('ResetPassword', resetPasswordSchmea);