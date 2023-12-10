'use strict'
const mongoose = require('mongoose')
const Task = require('../models/task.model')
const User = require('../models/user.model')

class TaskController {
    index = async (req, res, next) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.userId)) {
                return res.status(400).json({
                    code: "40000",
                    message: "Invalid user ID",
                    data: []
                });
            }

            const currUser = await User.findById(req.userId)
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
            const { name, start_day, end_day, color, description, category, status, priority } = req.body;

            const task = new Task({
                name,
                start_day,
                end_day,
                color,
                description,
                user: req.userId,
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
            const { name, start_day, end_day, color, description, category, status, priority } = req.body;

            const task = await Task.findByIdAndUpdate(
                taskId,
                {
                    name,
                    start_day,
                    end_day,
                    color,
                    description,
                    user: req.userId,
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

    search = async (req, res, next) => {
        const startDate = req.params.startDate
        const endDate = req.params.endDate

        const start = new Date(startDate)
        const end = new Date(endDate)
        start.setHours(0);
        start.setMinutes(0);
        start.setSeconds(0);
        start.setMilliseconds(0);
        end.setHours(23);
        end.setMinutes(59);
        end.setSeconds(59);
        end.setMilliseconds(999);

        try {
            const tasks = await Task.find().lean();
            const results = tasks.filter(task => {
                if (new Date(task.start_day).getTime() >= start.getTime()
                    && new Date(task.end_day).getTime() <= end.getTime()) {
                    return true
                }
                return false
            })

            return res.status(200).json({
                code: "20000",
                data: results
            });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new TaskController()
