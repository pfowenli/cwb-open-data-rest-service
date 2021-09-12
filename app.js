const express = require('express')
const {
    SampleRouter,
    DefaultRouter,
} = require('./routers')
const {
    AuthorizationHandler,
} = require('./handlers')
const DatabaseClient = require('./database-client')
const {
    CustomAsyncWrap,
} = require('./utils')
const {  
    HOSTNAME,
    PORT,
} = require('./config')


DatabaseClient.connect()

const server = express()

server.use(express.json())
server.use(CustomAsyncWrap(AuthorizationHandler.checkPermission))
server.use('/api/v1', DefaultRouter)

server.listen(PORT, HOSTNAME, () => {
    console.log(`web server is running at http://${HOSTNAME}:${PORT}`)
})
