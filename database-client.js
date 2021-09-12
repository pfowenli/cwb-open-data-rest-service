const {
    CustomDatabaseClient,
} = require('./utils')
const {
    DATABASE,
} = require('./config')

const _databaseClient = new CustomDatabaseClient()
    .setHost(DATABASE.HOST)
    .setPort(DATABASE.PORT)
    .setUsername(DATABASE.USERNAME)
    .setPassword(DATABASE.PASSWORD)
    .setAuthDatabaseName(DATABASE.AUTH_DATABASE_NAME)
    .setDatabaseName(DATABASE.DATABASE_NAME)

const _getCollection = async function (collectionName = '') {
    const collection = (await _databaseClient.existsCollection(collectionName)) ?
        _databaseClient.getCollection(collectionName) :
        await _databaseClient.createCollection(collectionName)

    return collection
}

module.exports = _databaseClient
exports.getCollection = _getCollection
