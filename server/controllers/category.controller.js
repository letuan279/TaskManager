'use strict';
const mongoose = require('mongoose');
const Category = require('../models/category.model');
const User = require('../models/user.model');
const Task = require('../models/task.model');

class CategoryController {
    index = async (req, res, next) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.userId)) {
                return res.status(400).json({
                    code: "40000",
                    message: "Invalid user ID",
                    data: []
                });
            }

            const currUser = await User.findById(req.userId);
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
            const { name, color, description } = req.body;

            const category = new Category({
                name,
                color,
                description,
                user: req.userId
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
            const { name, color, description } = req.body;

            const category = await Category.findByIdAndUpdate(
                categoryId,
                {
                    name,
                    color,
                    description,
                    user: req.userId,
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

            await Category.deleteOne({ _id: category._id });
            await Task.deleteMany({ category: category._id });

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