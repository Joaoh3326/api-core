const http = require('http')
const app = require('./src/app')
const PORT = 3000

http.createServer(app)
    .listen(PORT, () => console.log('server running at', PORT))
