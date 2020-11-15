const router = require('express').Router();
const bcrypt = require('bcryptjs');

const speakeasy = require('speakeasy');
const uuid = require('uuid');

const User = require('../model/User');

const jwt = require('jsonwebtoken');

//Validation
const { registerValidation, loginValidation } = require('../validation'); 

router.post('/register', async (req,res) => {

    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check if User is already in database
    const emailExist = await User.findOne({email: req.body.email});

    if(emailExist) return res.status(400).send('Email already exists');

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    const secret = speakeasy.generateSecret();

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        secret: secret
    });
    try {
        const savedUser = await user.save();
        res.send({
            user: savedUser._id,
            secret:secret.base32
        });
    }
    catch(err){
        res.status(400).send(err);
    }
    res.send(error);

});

//Login Route
router.post('/login', async (req,res) => {
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //Check if user exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email or Password incorrect');

    //Check Password
    const validPass = await bcrypt.compare(req.body.password,user.password);

    if(!validPass) return res.status(400).send('Password incorrect');

    const verified = speakeasy.totp.verify({
        secret: user.secret.base32,
        encoding:'base32',
        token: req.body.token
    });

    if(!verified) return res.status(401).send('Incorrect Token');

    // Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    console.log("Login Success");
    res.header('auth-token',token).send({
        name: user.name,
        email: user.email,
        'auth-token':token
    });
    
    //res.send('Login Success');
});

module.exports = router;