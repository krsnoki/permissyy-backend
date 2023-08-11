const express = require('express');
const router = express.Router();

// declaring variables for routes
const {
    getUsers, 
    getUser,
    setUsers,
    updateUsers, 
    deleteUsers,
    findUser,
    
} = require('../controllers/getControllers');
const { route } = require('express/lib/application');



router.route('/getUsers').get(getUsers)
router.route('/createUser').post(setUsers)
router.route('/searchUser').get(findUser)

router.route('/getUser').get(getUser)
router.route('/deleteUser').delete(deleteUsers)
router.route('/updateUser').put(updateUsers)
router.route('/findUser').get(findUser)

module.exports = router