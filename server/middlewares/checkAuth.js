const jwt = require('jsonwebtoken')

// Authorization: Bearer <token> (for JWT)
// status 401 Unauthorized
// status 403 Forbidden

const verifyToken = (req, res, next) => {

    const headerAuth = req.header('Authorization')
    const token = headerAuth && headerAuth.split(' ')[1] // Bearer <token>

    if (!token) return res.status(401).json({ code: 40100, message: "Token not found", data: [] })

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.userId = decoded.userId
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({ code: 40300, message: "Invalid token", data: [] })
    }
}

module.exports = verifyToken
