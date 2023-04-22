const asyncHandler = require('express-async-handler')
//@desc Get goals
//@route GET /api/goals
// @access Private
const getGoals = asyncHandler(async(req, res) => {
    console.log(req.body)
    res.status(200).json({message: 'ok'})
})

//@desc Get goals
//@route GET /api/goals
// @access Private
const getGoal = asyncHandler(async(req, res) => {
    console.log(req.body)
    if(!req.params.id){
        res.status(404)
        throw new Error('File not found')
    }
    res.status(200).json({message: `getting id: ${req.params.id}`})
})


// @desc Set goals
// @route POST /api/goals/
// @access Private
const setGoals = asyncHandler(async(req, res) => {
     if(!req.body.text){
         res.status(400)
         throw new Error('Enter text message error occurred')
    }
    // prints body over console
    console.log(req.body)
    res.status(200).json({message: 'text'})
})
 
//@desc Update goals
//@route PUT /api/goals/ 
// @access Private
const updateGoals = asyncHandler(async(req, res) => {
    res.status(200).json({message: `3. Create fetch API no. ${req.params.id}`})
})

//@desc Delete goals
//@route DELETE /api/goals
// @access Private
const deleteGoals = asyncHandler(async(req, res) => {
    res.status(200).json({message: `4. Create fetch API no. ${req.params.id}`})
}
)
module.exports = {
    getGoals,
    getGoal,
    setGoals,
    updateGoals,
    deleteGoals
  
}