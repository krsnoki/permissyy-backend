const asyncHandler = require('express-async-handler')
const nodemailer = require('nodemailer')
const path = require('path');
//handlebar for node mailer
const hbs = require('nodemailer-express-handlebars')

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
    const user = await User.create({
        name: req.get("name"),
        phone: req.get("phone"),
        username: req.get("username"),
        designation: req.get("designation"),
        email: req.get("email")
    })
            // initialize nodemailer
            var transporter = nodemailer.createTransport(
                {
                    service: 'gmail',
                    auth:{
                        user: '2710kklyani@gmail.com',
                        pass: 'lhvyxjjyzjcncngh'
                    }
                }
            );        
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
                from: '"Kalyani Kolte" <2710kkalyani@gmail.com>', // sender address
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

            res.status(200).send(user)
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
        email: req.body.email,
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

    

    // initialize nodemailer
    var transporter = nodemailer.createTransport(
        {
            service: 'gmail',
            auth:{
                user: '2710kklyani@gmail.com',
                pass: 'lhvyxjjyzjcncngh'
            }
        }
    );
    
            
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
        from: '"Kalyani Kolte" <2710kkalyani@gmail.com>', // sender address
        to: user.email, // list of receivers
        subject: 'Attention User Deleted!',
        template: 'userDelete', // the name of the template file i.e email.handlebars
        context:{
            name: user.name, // replace {{name}} with Adebola
        
        }
    };
    
    // trigger the sending of the E-mail
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

    res.status(200).json(user)
    }
    // const deleteduser = await User.findById(req.get("_id"))
    // if(!deleteduser){
    //     res.status(400)
    //     throw new Error("User is not there to remove")
    // }
    // await User.deleteOne()

})



const mailUser = asyncHandler(async(req, res) => {
    const user = await User.findOne({ "name": req.get("name")})

    if (user === null) {
        console.log("Error!, user not found");
        res.status(404).send("Not a registered user !")
    }else{
        console.log("found")
        // initialize nodemailer
            var transporter = nodemailer.createTransport(
                {
                    service: 'gmail',
                    auth:{
                        user: '2710kklyani@gmail.com',
                        pass: 'jtgjygelfaqvpkxa'
                    }
                }
            );
            
                    
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
                from: '"Kalyani Kolte" <2710kkalyani@gmail.com>', // sender address
                to: user.email, // list of receivers
                subject: 'Welcome to Permissy!!',
                template: 'hello', // the name of the template file i.e email.handlebars
                context:{
                    name: user.name, // replace {{name}} with Adebola
                
                }
            };
            
            // trigger the sending of the E-mail
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });

            res.status(200).json(user)
    }

    }
)




const findUser = asyncHandler(async(req, res) => {
    const user = await User.find({"name": req.get("name")})

    if(user === null){
        console.log("no user")
        res.status(404).send("No user found!")
    } else {
        res.status(200).send(user)
        console.log(user)
    }
})

//exporting methods of module
module.exports = {
    getUsers,
    getUser,
    setUsers,
    updateUsers,
    deleteUsers,
    findUser,
    mailUser,
}