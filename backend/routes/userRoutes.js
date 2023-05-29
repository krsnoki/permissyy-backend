const express = require('express');
const router = express.Router();

// declaring variables for routes
const {
    getUsers, 
    setUsers,
    updateUsers, 
    deleteUsers,
    findUser,
    
} = require('../controllers/getControllers')



router.route('/getUser').get(getUsers)
router.route('/createUser').post(setUsers)
router.route('/searchUser').get(findUser)

router.route('/deleteUser').delete(deleteUsers)
router.route('/updateUser').put(updateUsers)
router.route('/findUser').get(findUser)

module.exports = router