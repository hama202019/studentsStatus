const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema({
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.statics.signup = async function (email, password) {
    if(!email || !password) throw Error("All fields must be filled!");
    if(!validator.isEmail(email)) throw Error("Invalid email!");
    if(!validator.isStrongPassword(password)) throw Error("Password is not strong enough!");
    const checkInUse = await this.findOne({email});
    if(checkInUse) throw Error("Email already in use!");
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.create({email, password: hashedPassword});
    return user;
};

userSchema.statics.login = async function (email, password) {
    if(!email || !password) throw Error("All fields must be filled!");
    if(!validator.isEmail(email)) throw Error("Invalid email!");
    const findUser = await this.findOne({email});
    if(!findUser) throw Error("Email not found!");
    const passwordIsCorrect = bcrypt.compare(password, findUser.password);
    if(!passwordIsCorrect) throw Error("Incorrect password!");
    return findUser;
};

module.exports = mongoose.model('User', userSchema);