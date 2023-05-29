const express = require('express');
const router = express.Router();

const {
    applyRequest,
} = require('../controllers/applicationControllers')

router.route('/applyRequest').post(applyRequest)