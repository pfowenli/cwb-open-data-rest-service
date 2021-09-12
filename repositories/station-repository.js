const DatabaseClient = require('../database-client')
const {
    DATA_MODEL_ENUMERATIONS,
} = require('../enums')


const _saveOne = async (model = {}) => {
    const collection = await DatabaseClient.getCollection(DATA_MODEL_ENUMERATIONS.STATION)

    const data = {
        stationId: model.stationId,
        stationName: model.stationName,
        stationNameEN: model.stationNameEN,
        stationAltitude: model.stationAltitude,
        longitude: model.longitude,
        latitude: model.latitude,
        countyName: model.countyName,
        stationAddress: model.stationAddress,
        startDate: model.startDate,
        endDate: model.endDate,
        status: model.status,
        note: model.note,
        originalStationId: model.originalStationId,
        newStationId: model.newStationId,
    }

    await collection.insertOne(data)

    return model
}

const _findOneByStationId = async (stationId = '') => {
    const collection = await DatabaseClient.getCollection(DATA_MODEL_ENUMERATIONS.STATION)

    const model = collection.findOne({ stationId })

    return model
}

const _findMany = async (filter = {}, options = {}) => {
    const collection = await DatabaseClient.getCollection(DATA_MODEL_ENUMERATIONS.STATION)

    const cursor = collection.find(filter)

    if (options.limit) {
        cursor.limit(options.limit)
    }
    
    const models = await cursor.toArray()

    return models
}

exports.saveOne = _saveOne
exports.findOneByStationId = _findOneByStationId
exports.findMany = _findMany
