'use strict'

class UserController {
    signUp = async (req, res, next) => {
        try {
            console.log(`[P]::signUp::`, req.body);

            return res.status(201).json({
                code: "20001",
                metadata: { userId: 2 }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()
