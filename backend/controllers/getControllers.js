const asyncHandler = require('express-async-handler')

//importing schema model
const User = require('../models/userModel')
const { default: mongoose } = require('mongoose')



//@desc Get users
//@route GET /api/users
// @access Private
const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find()
    console.log(req.body)
    res.status(200).json(users)
})


//@desc Get users
//@route GET /api/users
// @access Private
const getUser = asyncHandler(async(req, res) => {
    if(!req.params.id){
        res.status(404)
        throw new Error('File not found')
    }
    res.status(200).json({message: `getting id: ${req.params.id}`})
})


// @desc Set users
// @route POST /api/users/
// @access Private
const setUsers = asyncHandler(async(req, res) => {
    // prints body over console
    const users = await User.create({
        name: req.get("name"),
        phone: req.get("phone"),
        username: req.get("username"),
        designation: req.get("designation")
    })
    res.status(200).json(users)
})

 
//@desc Update users
//@route PUT /api/users/ 
// @access Private
const updateUsers = asyncHandler(async(req, res) => {
    // if(!req.params.id){
    //     res.status(400).send("enter id in parameter")
    //     console.log("Empty id field")
    // }
    // const user = await User.findByIdAndUpdate(req.params.id, {
    //     name: req.body.name,
    //     phone: req.body.phone,
    //     username: req.body.username,
    //     designation: req.body.designation,
    // }, {
    //     new: true,
    // })
    
    const user = await User.findByIdAndUpdate({_id: req.get("_id")},
    {
        name: req.body.name,
        phone: req.body.phone,
        username: req.body.username,
        designation: req.body.designation,
    }
    ,{new: true,})

    if(!user){
       res.status(404).send("No user found")
    }

    res.status(200).send("user updated")

})


//@desc Delete users
//@route DELETE /api/users
// @access Private
const deleteUsers = asyncHandler(async(req, res) => {
    const user = await User.findByIdAndDelete(req.get("_id"))
    if (user === null) {
        console.log("No user found with this ID")
        res.status(404).send("No user found")
    } else {
        console.log("User found and deleted: " + user)
        res.status(200).json(user)
    }
    // const deleteduser = await User.findById(req.get("_id"))
    // if(!deleteduser){
    //     res.status(400)
    //     throw new Error("User is not there to remove")
    // }
    // await User.deleteOne()
})

//exporting methods of module
module.exports = {
    getUsers,
    getUser,
    setUsers,
    updateUsers,
    deleteUsers
  
}