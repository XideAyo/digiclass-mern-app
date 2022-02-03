const User = require('../models/userModel')
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const generateToken = require('../utils/generateToken')

const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password, picture} = req.body

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error("User already Exists")
    }

    const user = await User.create({
        name, email, password, picture
    })

    const salt = bcrypt.genSaltSync(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            picture: user.picture,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Error Occured! ")
    }

    res.json({
        name, email
    })
})

const authUser = asyncHandler( async (req, res) => {
    const { email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            picture: user.picture,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error("Invalid Email or Password! ")
    }
})


module.exports = {registerUser, authUser}