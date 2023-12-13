'use strict'
const mongoose = require('mongoose')
const Task = require('../models/task.model')
const User = require('../models/user.model')
const Category = require('../models/category.model')

const { google } = require('googleapis');

const YOUR_CLIENT_ID = '544769320623-1afqfobicnrar2p7j2bf4pghshtl323q.apps.googleusercontent.com'
const YOUR_CLIENT_SECRET = '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'
const YOUR_REDIRECT_URI = 'http://localhost:3000/setting'

let oauth2Client = new google.auth.OAuth2(
    YOUR_CLIENT_ID,
    YOUR_CLIENT_SECRET,
    YOUR_REDIRECT_URI
);

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

    authGoogle = async (req, res, next) => {
        try {
            const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
            oauth2Client = new google.auth.OAuth2(
                YOUR_CLIENT_ID,
                YOUR_CLIENT_SECRET,
                'http://localhost:3000/setting'
            );
            const url = oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: SCOPES,
                prompt: 'consent',
                include_granted_scopes: true,
            });
            return res.json(url)
        } catch (error) {
            console.log(error.message);
            next(error)
        }
    }

    googleTask = async (req, res, next) => {
        try {
            const { code } = req.query;

            const { tokens } = await oauth2Client.getToken(code)
            oauth2Client.setCredentials(tokens);

            const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

            const colorsRes = await calendar.colors.get();
            const eventColors = colorsRes.data.event;

            const calendarRes = await calendar.events.list({
                calendarId: 'primary',
                timeMin: new Date('2023-01-01T00:00:00Z').toISOString(),
                timeMax: new Date('2024-12-31T23:59:59Z').toISOString(),
                singleEvents: true,
                orderBy: 'startTime',
            });

            const adjustedEvents = calendarRes.data.items.map(event => {
                if (event.start.dateTime) {
                    event.start.dateTime = new Date(new Date(event.start.dateTime).getTime() - 7 * 60 * 60 * 1000).toISOString();
                }

                if (event.end.dateTime) {
                    event.end.dateTime = new Date(new Date(event.end.dateTime).getTime() - 7 * 60 * 60 * 1000).toISOString();
                }

                return event;
            });

            const filteredEvents = adjustedEvents.filter(event =>
                event.start.dateTime && event.end.dateTime
            ).map(event => {
                const colorId = event.colorId;
                const color = colorId && eventColors[colorId] ? eventColors[colorId].background : null;
                return { ...event, color };
            });

            res.json(filteredEvents);
        } catch (error) {
            console.error('Error fetching calendar data:', error);
            next(error);
        }
    };

    storeBulk = async (req, res, next) => {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const tasksData = req.body.tasks;
            const category = req.params.category;

            if (!Array.isArray(tasksData)) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({
                    code: "40000",
                    message: "Invalid input format: Expected an array of tasks"
                });
            }

            const newCategory = new Category({
                name: category,
                color: "purple",
                description: "",
                user: req.userId,
            });

            await newCategory.save({ session });

            const tasks = tasksData.map(taskData => new Task({
                ...taskData,
                user: req.userId,
                category: newCategory._id
            }));

            await Task.insertMany(tasks, { session });

            await session.commitTransaction();
            session.endSession();

            return res.status(201).json({
                code: "20100",
                message: "Bulk task creation successful!"
            });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            next(error);
        }
    };

}

module.exports = new TaskController()
