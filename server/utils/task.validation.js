const mongoose = require('mongoose')

const statusList = {
    "1": "TODO",
    "2": "PROCESS",
    "3": "DONE"
}

const priorityList = {
    "1": "HIGH",
    "2": "MIDDLE",
    "3": "LOW"
}

const colorList = ['slate', 'red', 'orange', 'yellow', 'lime', 'green', 'blue', 'purple', 'pink']


const validateTaskFields = (req, res, next) => {
    const { name, start_day, end_day, color, user, category, status, priority } = req.body;

    if (!name || !start_day || !end_day || !color || !user || !category || !status || !priority) {
        return res.status(400).json({
            code: "40000",
            data: [],
            message: "Not enough data to perform action!",
        });
    }

    if (name.length >= 100) {
        return res.status(400).json({
            code: "40000",
            data: [],
            message: "name must be < 100 character",
        });
    }

    if (start_day && isNaN(Date.parse(start_day))) {
        return res.status(400).json({
            code: "40000",
            data: [],
            message: "Invalid start day",
        });
    }

    if (end_day && isNaN(Date.parse(end_day))) {
        return res.status(400).json({
            code: "40000",
            data: [],
            message: "Invalid end day",
        });
    }

    if (!mongoose.Types.ObjectId.isValid(category)) {
        return res.status(400).json({
            code: "40000",
            data: [],
            message: "Invalid category ID",
        });
    }

    if (!mongoose.Types.ObjectId.isValid(user)) {
        return res.status(400).json({
            code: "40000",
            data: [],
            message: "Invalid user ID",
        });
    }

    if (!Object.keys(statusList).includes(String(status))) {
        return res.status(400).json({
            code: "40000",
            data: [],
            message: "Invalid status number, must be in [1,2,3]",
        });
    }

    if (!Object.keys(priorityList).includes(String(priority))) {
        return res.status(400).json({
            code: "40000",
            data: [],
            message: "Invalid priority number, must be in [1,2,3]",
        });
    }

    if (!colorList.includes(color)) {
        return res.status(400).json({
            code: "40000",
            data: [],
            message: "Invalid color string,  must be in ['slate', 'red', 'orange', 'yellow', 'lime', 'green', 'blue', 'purple', 'pink']",
        });
    }

    next()
}

module.exports = validateTaskFields