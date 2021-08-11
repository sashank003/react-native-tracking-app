const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).send({ error: 'No token, authorization denied' });
    }
    
    try {
        jwt.verify(token, 'secret_key', async (error, decoded) => {
            if (error) {
                return res.status(401).send({error: 'Authorization denied'});
            } else {
                const {userId} = decoded;

                const user = await User.findById(userId);
                req.user = user;
                next();
            }
        });
    } catch (err) {
        console.error('something wrong with auth middleware');
        res.status(500).json({ msg: 'Server Error' });
    }
    

};

