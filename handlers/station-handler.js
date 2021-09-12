const {
    StationRepository,
} = require('../repositories')
const {
    STATION_STATUS_ENUMERATIONS,
} = require('../enums')


const _mapStation = _station => ({
    stationId: _station.stationId,
    stationName: _station.stationName,
    countyName: _station.countyName,
})

const _list = async (req, res, next) => {
    const filter = {
        status: STATION_STATUS_ENUMERATIONS.VALID,
    }
    const stations = await StationRepository.findMany(filter)

    res.json(stations.map(_mapStation))

    await next()
}

exports.list = _list
