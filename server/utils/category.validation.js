const mongoose = require('mongoose')

const colorList = ['slate', 'red', 'orange', 'yellow', 'lime', 'green', 'blue', 'purple', 'pink']


const validateCategoryFields = (req, res, next) => {
    const { name, color, user } = req.body;

    if (!name || !color || !user) {
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

    if (!mongoose.Types.ObjectId.isValid(user)) {
        return res.status(400).json({
            code: "40000",
            data: [],
            message: "Invalid user ID",
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

module.exports = validateCategoryFields
