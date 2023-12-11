'use strict'

const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

class UserController {
    checkUser = async (req, res, next) => {
        try {
            const user = await User.findById(req.userId).select("-password")
            if (!user) return res.status(404).json({
                code: "40400",
                message: "Current user not found",
                data: []
            });

            return res.status(200).json({
                code: "20000",
                message: "Succeeded!",
                data: user
            })
        } catch (error) {
            next(error);
        }
    }

    login = async (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                code: "40000",
                message: "Insufficient email address or password",
                data: []
            });
        }

        try {
            const user = await User.findOne({ email });
            if (user) {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    const accessToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
                    return res.status(200).json({
                        code: "20000",
                        message: "Login succeeded!",
                        data: { user, accessToken }
                    })
                } else {
                    return res.status(400).json({
                        code: "40000",
                        message: "Invalid username or password",
                        data: []
                    })
                }
            } else {
                return res.status(400).json({
                    code: "40000",
                    message: "Invalid username or password",
                    data: []
                })
            }
        } catch (error) {
            next(error)
        }
    }

    register = async (req, res, next) => {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({
                code: "40000",
                message: "Registration information is missing",
                data: []
            });
        }

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    code: "40000",
                    message: "Email already exists",
                    data: []
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                email,
                password: hashedPassword,
                name,
            });
            await newUser.save();

            const accessToken = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY);
            return res.status(200).json({
                code: "20000",
                message: "Registration was successful!",
                data: { user: newUser, accessToken }
            })
        } catch (error) {
            next(error)
        }
    }

    editProfile = async (req, res, next) => {
        const { email, name, oldPassword, newPassword } = req.body;

        if (!email || !name || !oldPassword || !newPassword) {
            return res.status(400).json({
                code: "40000",
                message: "Registration information is missing",
                data: []
            });
        }

        try {
            const user = await User.findById(req.userId);
            const userMail = await User.findOne({ email })
            if (userMail && userMail._id !== user._id) {
                return res.status(400).json({
                    code: "40000",
                    message: "Email already exists",
                    data: []
                })
            }

            const passwordMatch = await bcrypt.compare(oldPassword, user.password);
            if (passwordMatch) {
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                const editUser = await User.findByIdAndUpdate(
                    req.userId,
                    {
                        name,
                        email,
                        password: hashedPassword
                    },
                    { new: true }
                ).lean();

                return res.status(200).json({
                    code: "20000",
                    message: "Profile updated successfully",
                    data: editUser
                })
            } else {
                return res.status(400).json({
                    code: "40000",
                    message: "Previous password is incorrect",
                    data: []
                })
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()
