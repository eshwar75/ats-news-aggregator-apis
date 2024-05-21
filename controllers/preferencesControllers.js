const User = require("../models/user");

exports.getThePerferencesDetails = (req, res) => {
    const { user: userPassed, message: messagePassed } = req
    try {
        if (userPassed) {
            User.findById(userPassed.id).then((userValue) => {
                return res.status(200).send({ result: true, preferences: userValue.preferences });
            }).catch((err) => {
                return res.status(400).send({ result: false, message: err });
            });
        } else {
            return res.status(401).send({ result: false, message: messagePassed });
        }
    } catch (error) {
        return res.status(500).send({ result: false, message: "something want wrong" });
    }
}

exports.updateThePerferencesDetails = (req, res) => {
    const { user: userPassed, message: messagePassed, body: bodyPassed } = req
    try {
        if (userPassed) {
            const id = userPassed.id;
            User.findByIdAndUpdate(id, { preferences: bodyPassed.preferences }).then((userValue) => {
                return res.status(201).send({ result: true, message: 'updated successfully' });
            }).catch((err) => {
                return res.status(400).send({ result: false, message: err });
            });
        } else {
            return res.status(401).json({ result: false, message: messagePassed });
        }
    } catch (error) {
        return res.status(500).send({ result: false, message: "something want wrong" });
    }
}