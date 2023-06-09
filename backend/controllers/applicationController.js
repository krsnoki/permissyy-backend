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
     // point to the template folder
     const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./views/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./backend/views'),
    };
    
    // use a template file with nodemailer
    transporter.use('compile', hbs(handlebarOptions))
    
    
    var mailOptions = {
        from: '"Permissy" <2710kkalyani@gmail.com>', // sender address
        to: user.email, // list of receivers
        subject: 'New Account Created!!',
        template: 'userCreated', // the name of the template file i.e email.handlebars
        context:{
            name: user.name, // replace {{name}} 
            username: user.username,
            des: user.designation,
        }
    };
    // trigger the sending of the E-mail
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
})



module.exports ={
    applyRequest,
}