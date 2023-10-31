'use strict'
const Task = require('../models/task.model')
const User = require('../models/user.model')

class TaskController {
    index = async (req, res, next) => {
        try {
            // Simulate user
            const user = (await User.find()).at(0)

            const tasks = await Task.find({ user: user._id }).populate(['category']).lean()

            return res.status(200).json({
                code: "20000",
                metadata: { tasks }
            })
        } catch (error) {
            next(error)
        }
    }

    store = async (req, res, next) => {
        try {
            const { name, start_day, end_day, color, user, category, status, priority } = req.body;

            const task = new Task({
                name,
                start_day,
                end_day,
                color,
                user,
                category,
                status,
                priority,
            });

            await task.save();

            return res.status(201).json({
                code: "20100",
                metadata: { task },
            });
        } catch (error) {
            next(error);
        }
    };

    show = async (req, res, next) => {
        try {
            const taskId = req.params.id;

            const task = await Task.findById(taskId).populate(['category']).lean();

            if (!task) {
                return res.status(404).json({
                    code: "40400",
                    message: "Task not found",
                });
            }

            return res.status(200).json({
                code: "20000",
                metadata: { task },
            });
        } catch (error) {
            next(error);
        }
    };

    update = async (req, res, next) => {
        try {
            const taskId = req.params.id;
            const { name, start_day, end_day, color, user, category, status, priority } = req.body;

            const task = await Task.findByIdAndUpdate(
                taskId,
                {
                    name,
                    start_day,
                    end_day,
                    color,
                    user,
                    category,
                    status,
                    priority,
                },
                { new: true }
            ).populate(['category']).lean();

            if (!task) {
                return res.status(404).json({
                    code: "40400",
                    message: "Task not found",
                });
            }

            return res.status(200).json({
                code: "20000",
                metadata: { task },
            });
        } catch (error) {
            next(error);
        }
    };

    destroy = async (req, res, next) => {
        try {
            const taskId = req.params.id;

            const task = await Task.findByIdAndRemove(taskId).populate(['category']).lean();

            if (!task) {
                return res.status(404).json({
                    code: "40400",
                    message: "Task not found",
                });
            }

            return res.status(200).json({
                code: "20000",
                message: "Task deleted successfully",
            });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new TaskController()
