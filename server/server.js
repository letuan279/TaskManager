const app = require('./app')
const config = require('./configs/config.mongodb')
const port = config.app.port

const server = app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
})

// When enter Ctrl + C
process.on('SIGINT', () => {
    server.close(() => console.log("Exit server!!"))
})
