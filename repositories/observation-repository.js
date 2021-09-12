const DatabaseClient = require('../database-client')
const {
    DATA_MODEL_ENUMERATIONS,
} = require('../enums')


const _saveOne = async (model = {}) => {
    const collection = await DatabaseClient.getCollection(DATA_MODEL_ENUMERATIONS.OBSERVATION)

    const data = {
        stationId: model.stationId,
        observationTime: model.observationTime,
        ELEV: model.ELEV,
        WDIR: model.WDIR,
        WDSD: model.WDSD,
        TEMP: model.TEMP,
        HUMD: model.HUMD,
        PRES: model.PRES,
        H_24R: model.H_24R,
        H_FX: model.H_FX,
        H_XD: model.H_XD,
        H_FXT: model.H_FXT,
        D_TX: model.D_TX,
        D_TXT: model.D_TXT,
        D_TN: model.D_TN,
        D_TNT: model.D_TNT,
    }

    await collection.insertOne(data)

    return model
}

const _findOneByStationIdAndObservationTime = async (stationId = '', observationTime = '') => {
    const collection = await DatabaseClient.getCollection(DATA_MODEL_ENUMERATIONS.OBSERVATION)

    const filter = {
        stationId,
        observationTime,
    }

    const model = collection.findOne(filter)
    
    return model
}

const _findMany = async (filter = {}, options = {}) => {
    const collection = await DatabaseClient.getCollection(DATA_MODEL_ENUMERATIONS.OBSERVATION)

    const cursor = collection.find(filter)

    if (options.limit) {
        cursor.limit(options.limit)
    }

    if (options.sort) {
        cursor.sort(options.sort)
    }
    
    const models = await cursor.toArray()

    return models
}

exports.saveOne = _saveOne
exports.findOneByStationIdAndObservationTime = _findOneByStationIdAndObservationTime
exports.findMany = _findMany
