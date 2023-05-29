const asyncHandler = require('express-async-handler')

//importing schema model
const User = require('../models/userModel')
const Application = require('../models/applicationModel')
const { default: mongoose } = require('mongoose')

//@desc Get users
//@route GET /api/users
// @access Private
const applyRequest = asyncHandler(async(req, res) => {
    if(!req.params.id){
        res.status(404)
        throw new Error('File not found')
    }
    res.status(200).json({message: `getting id: ${req.params.id}`})
})



module.exports ={
    applyRequest,
}