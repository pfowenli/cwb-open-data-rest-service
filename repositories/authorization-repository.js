const DatabaseClient = require('../database-client')
const {
    DATA_MODEL_ENUMERATIONS,
} = require('../enums')


const _findOneByAuthToken = async (authToken = '') => {
    const collection = await DatabaseClient.getCollection(DATA_MODEL_ENUMERATIONS.AUTHORIZATION)

    const filter = {
        authToken,
    }

    const model = collection.findOne(filter)
    
    return model
}

exports.findOneByAuthToken = _findOneByAuthToken
