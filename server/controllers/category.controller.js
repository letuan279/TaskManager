'use strict';
const mongoose = require('mongoose');
const Category = require('../models/category.model');
const User = require('../models/user.model');

class CategoryController {
    index = async (req, res, next) => {
        try {
            const { user } = req.body;

            if (!mongoose.Types.ObjectId.isValid(user)) {
                return res.status(400).json({
                    code: "40000",
                    message: "Invalid user ID",
                    data: []
                });
            }

            const currUser = await User.findById(user);
            if (!currUser) {
                return res.status(404).json({
                    code: "40400",
                    message: "Not found current user",
                    data: []
                });
            }

            const categories = await Category.find({ user: currUser._id }).lean();

            return res.status(200).json({
                code: "20000",
                message: "Success!",
                data: { categories }
            });
        } catch (error) {
            next(error);
        }
    };

    store = async (req, res, next) => {
        try {
            const { name, color, user } = req.body;

            const category = new Category({
                name,
                color,
                user,
            });

            await category.save();

            return res.status(201).json({
                code: "20100",
                data: { category },
                message: "Create new category successfully!"
            });
        } catch (error) {
            next(error);
        }
    };

    show = async (req, res, next) => {
        try {
            const categoryId = req.params.id;

            const category = await Category.findById(categoryId).lean();

            if (!category) {
                return res.status(404).json({
                    code: "40400",
                    message: "Category not found",
                    data: []
                });
            }

            return res.status(200).json({
                code: "20000",
                data: { category },
                message: ""
            });
        } catch (error) {
            next(error);
        }
    };

    update = async (req, res, next) => {
        try {
            const categoryId = req.params.id;
            const { name, color, user } = req.body;

            const category = await Category.findByIdAndUpdate(
                categoryId,
                {
                    name,
                    color,
                    user,
                },
                { new: true }
            ).lean();

            if (!category) {
                return res.status(404).json({
                    code: "40400",
                    message: "Category not found",
                    data: []
                });
            }

            return res.status(200).json({
                code: "20000",
                data: { category },
                message: "Update successfully!"
            });
        } catch (error) {
            next(error);
        }
    };

    destroy = async (req, res, next) => {
        try {
            const categoryId = req.params.id;

            const category = await Category.findById(categoryId).lean();

            if (!category) {
                return res.status(404).json({
                    code: "40400",
                    message: "Category not found",
                    data: []
                });
            }

            await Category.deleteOne(category);

            return res.status(200).json({
                code: "20000",
                message: "Category deleted successfully",
                data: []
            });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new CategoryController();
