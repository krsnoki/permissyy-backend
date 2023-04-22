const express = require('express');
const router = express.Router();
const {
    getGoals, 
    setGoals, 
    updateGoals, 
    deleteGoals,
} = require('../controllers/getControllers')

//get request
router.route('/').get(getGoals).post(setGoals)

//put request
router.route('/:id').delete(deleteGoals).put(updateGoals)

module.exports = router