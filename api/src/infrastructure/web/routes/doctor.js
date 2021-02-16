const express = require('express');
const { doctorControllers: controller } = require('../../../controllers/doctor');
const makeCallBack = require('../utils/express-callback');
// address - api/doctors
// load dependencies
const doctorsRouter = () => {
    const router = express.Router();

    // load controller with dependencies
    router.route('/')
        .get(makeCallBack(controller.getDoctors))
        .postmakeCallBack((makeCallBack(controller.postAddDoctor)));
    router.route('/:doctorId')
        .get(makeCallBack(controller.getDoctor))
        .post(makeCallBack(controller.postEditDoctor));
    router.route('/remove/:doctorId')
        .post(makeCallBack(controller.deleteDoctor));
    return router;
};

module.exports = doctorsRouter;