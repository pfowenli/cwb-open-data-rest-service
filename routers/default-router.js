const express = require('express')
const {
    StationHandler,
    ObservationHandler,
} = require('../handlers')
const {
    CustomAsyncWrap,
} = require('../utils')

const _router = express.Router()

_router.route('/stations')
    .get(CustomAsyncWrap(StationHandler.list))

_router.route('/observations')
    .get(CustomAsyncWrap(ObservationHandler.list))

_router.route('/observations/:stationId')
    .get(CustomAsyncWrap(ObservationHandler.listByStationId))

module.exports = _router
