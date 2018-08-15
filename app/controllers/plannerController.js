const mongoose = require('mongoose');
const shortid = require('shortid');
const crypto = require("crypto");

const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const passwordLib = require('../libs/password-lib');
const token = require('../libs/token-lib')




/* Models */
const UserModel = mongoose.model('User')
const AuthModel = mongoose.model('Auth')
const ResetPasswordModel = mongoose.model('ResetPassword');
const PlannerModel = mongoose.model('Planner')




var nodemailer = require("nodemailer");


let createMeetingFunction = (req, res) => {
    let userId = req.body.userId;
    let adminId = req.body.adminId;

    let findUser = () => {
        console.log("findUser");
        return new Promise((resolve, reject) => {
            if (req.body.userId) {
                console.log("req body UserID is there");
                console.log(req.body);
                UserModel.findOne({ userId: req.body.userId}, (err, userDetails) => {
                    /* handle the error here if the User is not found */
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'plannerController: findUser()', 10)
                        /* generate the error message and the api response message here */
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                        /* if Company Details is not found */
                    } else if (check.isEmpty(userDetails)) {
                        /* generate the response and the console error message here */
                        logger.error('No User Found', 'plannerController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                        reject(apiResponse)
                    } else {
                        /* prepare the message and the api response here */
                       

                        logger.info('User Found', 'plannerController: findUser()', 10)
                        resolve(userDetails);
                        
                    }
                });
               
            } else {
                let apiResponse = response.generate(true, '"UserID" parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    }

     let findAdmin = () => {
        console.log("findAdmin");
        return new Promise((resolve, reject) => {
            if (req.body.adminId) {
                console.log("adminId is there");
                console.log(req.body.adminId);
                UserModel.findOne({ userId: req.body.adminId}, (err, adminDetails) => {
                    /* handle the error here if the User is not found */
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve Admin Data', 'plannerController: findAdmin()', 10)
                        /* generate the error message and the api response message here */
                        let apiResponse = response.generate(true, 'Failed To Find Admin Details', 500, null)
                        reject(apiResponse)
                        /* if Company Details is not found */
                    } else if (check.isEmpty(adminDetails)) {
                        /* generate the response and the console error message here */
                        logger.error('No Admin Found', 'plannerController: findAdmin()', 7)
                        let apiResponse = response.generate(true, 'No Admin Details Found', 404, null)
                        reject(apiResponse)
                    } else {
                        /* prepare the message and the api response here */
                       

                        logger.info('Admin Found', 'plannerController: findAdmin()', 10)
                        resolve(adminDetails);
                        
                    }
                });
               
            } else {
                let apiResponse = response.generate(true, '"UserID" parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    }
    let createMeeting = (retreiveAdminDetails) => {
        return new Promise((resolve, reject) => {
                     if (!(check.isEmpty(req.body.place) || check.isEmpty(req.body.time) || check.isEmpty(req.body.purpose))) {
                        console.log(req.body)
                        let newMeeting = new PlannerModel({
                            meetingId:shortid.generate(),
                            userId:req.body.userId ,
                            place: req.body.place,
                            time: req.body.time,
                            purpose: req.body.purpose,
                            adminId: req.body.adminId,
                            adminName: retreiveAdminDetails.firstName + ' ' +retreiveAdminDetails.lastName ,
                            createdOn: time.now(),
                            modifiedOn: time.now()
                        })
                        newMeeting.save((err, newMeeting) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'plannerController: createMeeting', 10)
                                let apiResponse = response.generate(true, 'Failed to create new Meeting', 500, null)
                                reject(apiResponse)
                            } else {
                                let newMeetingObj = newMeeting.toObject();
                                delete newMeetingObj.__v;
                                delete newMeetingObj._id;
                                resolve(newMeetingObj)
                            }
                        })
                    } else {
                        logger.error('Please Provide All Details', 'plannerController: createMeeting', 4)
                        let apiResponse = response.generate(true, 'Please Provide All details', 403, null)
                        reject(apiResponse)
                    }
        })
    }// end create user function


    findUser(req, res)
        .then(findAdmin)
        .then(createMeeting)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Meeting Created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}

let getAllMeetingFunction = (req,res) => {
    console.log("UserID adminId"+req.params.userId+'  ' +req.params.adminId)

    // PlannerModel.find({ 'userId': req.params.userId , 'adminId':req.params.adminId}, (err, result) => {

    PlannerModel.find({ 'userId': req.params.userId , 'adminId':req.params.adminId})
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Planner Controller: getAllMeeting', 10)
                let apiResponse = response.generate(true, 'Failed To Find Meeting Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Meeting Found', 'Planner Controller: getAllMeeting')
                let apiResponse = response.generate(true, 'No Meeting Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Meeting Details Found', 200, result)
                res.send(apiResponse)
            }
        })

}


let deleteMeetingFunction = (req,res) => {

    if (check.isEmpty(req.params.meetingId)) {

        console.log('Meeting Id should be passed')
        let apiResponse = response.generate(true, 'Meeting Id is missing', 403, null)
        res.send(apiResponse)
    } else {


        PlannerModel.remove({ 'meetingId': req.params.meetingId }, (err, result) => {

            if (err) {

                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                let apiResponse = response.generate(true, 'Meeting Not Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Meeting Deleted Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }

}


let editMeetingFunction = (req,res) => {

    if (check.isEmpty(req.params.meetingId)) {

        console.log('meetingId should be passed')
        let apiResponse = response.generate(true, 'meetingId is missing', 403, null)
        res.send(apiResponse)
    } else {

        let options = req.body;
        console.log(options);
        PlannerModel.update({ 'meetingId': req.params.meetingId }, options, { multi: true }).exec((err, result) => {

            if (err) {

                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                let apiResponse = response.generate(true, 'Meeting Not Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Meeting Edited Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }

}
module.exports = {

    createMeeting:createMeetingFunction,
    getAllMeeting:getAllMeetingFunction,
    editMeeting:editMeetingFunction,
    deleteMeeting:deleteMeetingFunction

}// end exports