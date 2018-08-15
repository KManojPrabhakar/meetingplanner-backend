const express = require('express');
const router = express.Router();
const plannerController = require("./../../app/controllers/plannerController");

const appConfig = require("./../../config/appConfig")

module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/meetingPlanner`;


    app.post(`${baseUrl}/createMeeting`, plannerController.createMeeting);
    app.get(`${baseUrl}/getAllMeetings/:userId/:adminId`, plannerController.getAllMeeting);
    app.post(`${baseUrl}/deleteMeeting/:meetingId`, plannerController.deleteMeeting);
    app.put(`${baseUrl}/editMeeting/:meetingId`, plannerController.editMeeting);




}