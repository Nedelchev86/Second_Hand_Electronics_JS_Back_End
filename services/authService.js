const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");

exports.login = async (email, password) => {
    const user = await User.findOne({email});
    if (!user) throw new Error("User not found");
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Invalid password");
    const token = await jwt.sign({_id: user._id, email: user.email, username: user.username}, "ferferf345r34wrd34wf34f3", {expiresIn: "2h"});

    return token;
};

exports.register = async (userData) => {
    const emailExist = await User.findOne({email: userData.email});
    if (emailExist) throw new Error("Email already exists");
    if (userData.password !== userData.rePassword) throw new Error("Passwords do not match");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const user = new User({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
    });

    try {
        const savedUser = await user.save();
        return savedUser;
    } catch (err) {
        throw new Error(err.message);
    }
};
