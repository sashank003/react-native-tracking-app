const express = require('express');
const router= express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = new User({email, password});

        await user.save();

        jwt.sign(
            {userId: user._id},
            'secret_key',
            { expiresIn: '5 days' },
            (err, token) => {
            if (err) throw err;
            res.json({ token });
            });
        
    } catch (err) {
        return res.status(422).send(err.message);
    }
});


router.post('/signin', async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(422).send({error: 'Must provide email and password'});
    }

    const user = await User.findOne({email});

    if(!user) {
        return res.status(404).send({error: 'Invalid credentials'});
    }

    try {
        await user.comparePassword(password);

        jwt.sign(
            {userId: user._id},
            'secret_key',
            { expiresIn: '5 days' },
            (err, token) => {
            if (err) throw err;
            res.json({ token });
            });
        
    } catch (err) {
        return res.status(404).send({error: 'Invalid credentials'})
    }

})

module.exports = router;