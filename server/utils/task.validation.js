const mongoose = require('mongoose')

export const validateTaskFields = (req, res, next) => {
    const { name, start_day, end_day, color, user, category, status, priority } = req.body;

    if (!name || !start_day || !end_day || !color || !user || !category || !status || !priority) {
        return res.status(400).json({
            code: "40000",
            message: "Not enough data to perform action!",
        });
    }

    if (start_day && isNaN(Date.parse(start_day))) {
        return res.status(400).json({
            code: "40000",
            message: "Invalid start day format",
        });
    }

    if (end_day && isNaN(Date.parse(end_day))) {
        return res.status(400).json({
            code: "40000",
            message: "Invalid end day format",
        });
    }

    if (!mongoose.Types.ObjectId.isValid(category)) {
        return res.status(400).json({
            code: "40000",
            message: "Invalid category ID",
        });
    }

    next()
}
