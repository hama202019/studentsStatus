const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const iNeedTheToken = async (req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization){
        return res.status(401).json({error: "Unauthorized action!"});
    };
    const token = authorization.split(" ")[1];
    try {
        const {_id} = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findOne({_id}).select("_id");
        if(!req.user)  return res.status(401).json({error: "Unauthorized action!"});
        next();
    } catch(err) {
        res.status(401).json({error: "Unauthorized action!"});
    }
};
module.exports = iNeedTheToken;