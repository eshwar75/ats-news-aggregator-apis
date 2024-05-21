const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.register = (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const user = new User({
        firstName: firstName,
        lastName: lastName,
        fullName: `${firstName} ${lastName}`,
        email: email,
        password: bcrypt.hashSync(password, 8),
        preferences: req.body?.preferences || {},
    })
    user
        .save().then(() => {
            return res.status(201).send({ result: true, message: 'User registered successfully' });
        }).catch(() => {
            return res.status(500).json({ message: 'Error registering user' });
        })
}

exports.login = (req, res) => {
    const { email: emailPassed, password: pass } = req.body;
    User.findOne({
        email: emailPassed
    }).then((user) => {
        if (!user) {
            return res.status(404).send({ return: false, message: 'User not found' })
        }
        var isPasswordValid = bcrypt.compareSync(pass, user.password)
        if (!isPasswordValid) {
            return res.status(401).send({
                return: false,
                message: 'Invalid password'
            })
        } else {
            var token = jwt.sign({
                id: user.id
            }, process.env.LOGIN_SECRET, { expiresIn: '24h' });
            return res.status(200).send({
                user: { id: user.id }, message: 'login successful', accessToken: token
            });
        }
    }).catch(() => {
        return res.status(500).send({ return: false, message: 'Something want wrong' })
    })
}
