const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        jwt.verify(req.headers.authorization, process.env.LOGIN_SECRET, (err, decoded) => {
            if (err) {
                req.user = undefined;
                req.message = "Header verification failed";
                next();
            } else {
                User.findOne({
                    _id: decoded.id
                }).then((user) => {
                    req.user = user;
                    req.message = "FOund the user successfuly"
                    next();
                }).catch((err) => {
                    req.user = undefined;
                    req.message = 'something went worng while fetching the user infomation';
                    next();

                })
            }
        })
    } else {
        req.user = undefined;
        req.message = "Authorization header not found";
        next();
    }
}
module.exports = validateJWT;