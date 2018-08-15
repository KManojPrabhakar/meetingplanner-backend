'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let plannerSchema = new Schema({
  meetingId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  userId: {
    type: String,
    default: '',
  },
  place: {
    type: String,
    default: ''
  },
  time: {
    type: String,
    default: ''
  },
  purpose: {
    type: String,
    default: ''
  },
  adminName: {
    type: String,
    default: ''
  },
  adminId: {
    type: String,
    default: ''
  },
  createdOn :{
    type:Date,
    default:""
  },
  modifiedOn :{
    type:Date,
    default:""
  }
  


})


mongoose.model('Planner', plannerSchema);