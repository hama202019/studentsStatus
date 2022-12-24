const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.signup(email, password);
        const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY, {expiresIn: "3d"});
        res.status(201).json({email, token});
    } catch(err) {
        res.status(400).json({error: err.message});
    }
};
const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.login(email, password);
        const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY, {expiresIn: "3d"});
        res.status(201).json({email, token});
    } catch(err) {
        res.status(400).json({error: err.message});
    }
}

module.exports = {signup, login};