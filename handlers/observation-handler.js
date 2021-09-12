const {
    ObservationRepository,
} = require('../repositories')
const {
    CustomValidator,
} = require('../utils')


const STATION_ID_LENGTH = 6


const _mapObservation = _observation => ({
    stationId: _observation.stationId,
    observationTime: _observation.observationTime,
    ELEV: _observation.ELEV,
    WDIR: _observation.WDIR,
    WDSD: _observation.WDSD,
    TEMP: _observation.TEMP,
    HUMD: _observation.HUMD,
    PRES: _observation.PRES,
    H_24R: _observation.H_24R,
    H_FX: _observation.H_FX,
    H_XD: _observation.H_XD,
    H_FXT: _observation.H_FXT,
    D_TX: _observation.D_TX,
    D_TXT: _observation.D_TXT,
    D_TN: _observation.D_TN,
    D_TNT: _observation.D_TNT,
})


const _list = async (req, res, next) => {
    const {
        startTime,
        endTime,
    } = req.query

    const filter = {}
    if (!CustomValidator.isNonEmptyString(startTime) || !CustomValidator.isNonEmptyString(endTime)) {
        filter.observationTime = {}
    }
    if (!CustomValidator.isNonEmptyString(startTime)) {
        filter.observationTime['$gte'] = new Date(startTime)
    }
    if (!CustomValidator.isNonEmptyString(endTime)) {
        filter.observationTime['$lte'] = new Date(endTime)
    }

    const options = {
        sort: {
            observationTime: -1,
            stationId: 1,
        },
        limit: 1000,
    }
    const observations = await ObservationRepository.findMany(filter, options)

    res.json(observations.map(_mapObservation))

    await next()
}

const _listByStationId = async (req, res, next) => {
    const {
        stationId,
    } = req.params

    if (!CustomValidator.isNonEmptyString(stationId) || stationId.length !== STATION_ID_LENGTH) {
        console.error('stationId should be 6 digits')
        res.status(404)
            .send('stationId should be 6 digits')

        return next()
    }

    const filer = {
        stationId
    }

    const options = {
        sort: {
            observationTime: -1,
            stationId: 1,
        },
        limit: 1000,
    }

    const observations = await ObservationRepository.findMany(filer, options)

    res.json(observations.map(_mapObservation))

    await next()
}

exports.list = _list
exports.listByStationId = _listByStationId
