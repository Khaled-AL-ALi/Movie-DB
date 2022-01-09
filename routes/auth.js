const router = require('express').Router();
const crypt = require('bcryptjs/dist/bcrypt');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { signupValidattion, loginValidattion } = require('../validation');
const { use } = require('bcrypt/promises');

router.post('/register', async (req, res, next) => {

    const { error } = signupValidattion(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.send("email already exist");

    const salt = await crypt.genSalt(10);
    const haschpassword = await crypt.hash(req.body.password, salt)

    const user = new User({
        email: req.body.email,
        password: haschpassword,
    })
    user.save({}, (error, result) => {
        if (error) return next(error)
        res.send(result)
    })
})

router.post('/login', async (req, res, next) => {
    const { error } = loginValidattion(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.send("email not exist");

    const validpass = await crypt.compare(req.body.password, user.password)
    if (!validpass) return res.send("invalid password");

    const token = jwt.sign({ _id: user._id }, process.env.tokenway);
    res.header('auth-token', token).send(token);

})


module.exports = router;