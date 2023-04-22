//@desc Get goals
//@route GET /api/goals
// @access Private
const getGoals = (req, res) => {
    console.log(req.body)
    res.status(200).json({message: 'ok'})
}

// @desc Set goals
// @route POST /api/goals/:id
// @access Private
const setGoals = (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Enter text message error occurred')
    }
    //prints body over console
    console.log(req.body)
    res.status(200).json({message: `2. Create fetch API`})
}
 
//@desc Update goals
//@route PUT /api/goals/ 
// @access Private
const updateGoals = (req, res) => {
    res.status(200).json({message: `3. Create fetch API no. ${req.params.id}`})
}

//@desc Delete goals
//@route DELETE /api/goals
// @access Private
const deleteGoals = (req, res) => {
    res.status(200).json({message: `4. Create fetch API no. ${req.params.id}`})
}

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
  
}