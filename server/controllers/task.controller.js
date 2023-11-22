'use strict'
const mongoose = require('mongoose')
const Task = require('../models/task.model')
const User = require('../models/user.model')

class TaskController {
    index = async (req, res, next) => {
        try {
            const { user } = req.body

            if (!mongoose.Types.ObjectId.isValid(user)) {
                return res.status(400).json({
                    code: "40000",
                    message: "Invalid user ID",
                    data: []
                });
            }

            const currUser = await User.findById(user)
            if (!currUser) {
                return res.status(404).json({
                    code: "40400",
                    message: "Not found current user",
                    data: []
                });
            }

            const tasks = await Task.find({ user: currUser._id }).lean()

            return res.status(200).json({
                code: "20000",
                message: "Success!",
                data: { tasks }
            })
        } catch (error) {
            next(error)
        }
    }

    store = async (req, res, next) => {
        try {
            const { name, start_day, end_day, color, description, user, category, status, priority } = req.body;

            const task = new Task({
                name,
                start_day,
                end_day,
                color,
                description,
                user,
                category,
                status,
                priority,
            });

            await task.save();

            return res.status(201).json({
                code: "20100",
                data: { task },
                message: "Create new task successfully!"
            });
        } catch (error) {
            next(error);
        }
    };

    show = async (req, res, next) => {
        try {
            const taskId = req.params.id;

            const task = await Task.findById(taskId).lean();

            if (!task) {
                return res.status(404).json({
                    code: "40400",
                    message: "Task not found",
                    data: []
                });
            }

            return res.status(200).json({
                code: "20000",
                data: { task },
                message: ""
            });
        } catch (error) {
            next(error);
        }
    };

    update = async (req, res, next) => {
        try {
            const taskId = req.params.id;
            const { name, start_day, end_day, color, description, user, category, status, priority } = req.body;

            const task = await Task.findByIdAndUpdate(
                taskId,
                {
                    name,
                    start_day,
                    end_day,
                    color,
                    description,
                    user,
                    category,
                    status,
                    priority,
                },
                { new: true }
            ).lean();

            if (!task) {
                return res.status(404).json({
                    code: "40400",
                    message: "Task not found",
                    data: []
                });
            }

            return res.status(200).json({
                code: "20000",
                data: { task },
                message: "Update successfully!"
            });
        } catch (error) {
            next(error);
        }
    };

    destroy = async (req, res, next) => {
        try {
            const taskId = req.params.id;

            const task = await Task.findById(taskId).lean();

            if (!task) {
                return res.status(404).json({
                    code: "40400",
                    message: "Task not found",
                    data: []
                });
            }

            await Task.deleteOne(task)

            return res.status(200).json({
                code: "20000",
                message: "Task deleted successfully",
                data: []
            });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new TaskController()
