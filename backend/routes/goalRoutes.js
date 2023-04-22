const express = require('express');
const router = express.Router();
const {
    getGoals, 
    setGoals,
    updateGoals, 
    deleteGoals,
    getGoal,
} = require('../controllers/getControllers')

//get request
router.route('/').get(getGoals).post(setGoals)
router.route('/:id').delete(deleteGoals).put(updateGoals).get(getGoal)

module.exports = router