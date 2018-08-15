const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");

const appConfig = require("./../../config/appConfig")

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/meetingPlanner`;

    // defining routes.



    /**
    * @apiGroup todolist
    * @apiVersion  1.0.0
    * @api {post} /api/v1/todolist/signup api for user signup.
    *
    * @apiParam {string} email email of the user. (body params) (required)
    * @apiParam {string} firstName firstName of the user. (body params) (required)
    * @apiParam {string} lastName lastName of the user. (body params) (required)
    * @apiParam {string} countryCode countryCode of the user. (body params) (required)
    * @apiParam {string} mobileNumber mobileNumber of the user. (body params) (required)
    * @apiParam {string} password password of the user. (body params) (required)

    *
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
        {
           "error": false,
           "message": "SignUp Successful",
           "status": 200,
           "data": {
               "authToken": "eyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc",
               "userDetails": {
               "mobileNumber": 2234435524,
               "email": "someone@mail.com",
               "lastName": "Sengar",
               "firstName": "Rishabh",
               "userId": "-E9zxTYA8"
           }

       }
   */

      // params: firstName, lastName, email, mobileNumber, password


    app.post(`${baseUrl}/signup`, userController.signUpFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login api for user login.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc",
                "userDetails": {
                "mobileNumber": 2234435524,
                "email": "someone@mail.com",
                "lastName": "Sengar",
                "firstName": "Rishabh",
                "userId": "-E9zxTYA8"
            }

        }
    */

    // params: email, password.
    app.post(`${baseUrl}/login`, userController.loginFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/logout to logout user.
     *
     * @apiParam {string} userId userId of the user. (auth headers) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Logged Out Successfully",
            "status": 200,
            "data": null

        }
    */

    // auth token params: userId.
    app.post(`${baseUrl}/logout`, userController.logout);



    /**
     * @apiGroup todolist
     * @apiVersion  1.0.0
     * @api {post} /api/v1/todolist/forgot to forgot password user.
     *
     * @apiParam {string} forgotEmail forgotEmail of the user. (auth headers) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Reset Link Sent to your mail",
            "status": 200,
            "data": {
                "__v": 0,
                "resetPasswordToken": "e7dd6cd10df03c1f833c0b90a70fd7b8da05ee50",
                "resetPasswordExpires": "2018-07-22T12:29:39.018Z",
                "_id": "kjdsdggfdg",
                "email": "manojprabhaka@gmail.com"
            }
        }
    */

    //params:email
    app.post(`${baseUrl}/forgot`, userController.forgot);


 /**
     * @apiGroup todolist
     * @apiVersion  1.0.0
     * @api {post} /api/v1/todolist/reset to reset user.
     *
     * @apiParam {string} resetPassword resetPassword of the user. (auth headers) (required)
    * @apiParam {string} resetPasswordToken resetPasswordToken of the user. (auth headers) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
                    {
                "error": false,
                "message": "Password Updated Successfully",
                "status": 200,
                "data": {
                    "n": 1,
                    "nModified": 1,
                    "ok": 1
                }
            }
    */


    app.post(`${baseUrl}/reset`, userController.reset);

    app.get(`${baseUrl}/allUsers`, userController.getAllUsers);


}
