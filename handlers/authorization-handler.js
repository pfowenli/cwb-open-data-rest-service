const {
    AuthorizationRepository,
} = require('../repositories')


const _checkPermission = async (req, res, next) => {
    const authToken = req.headers['auth-token']

    if (!(await AuthorizationRepository.findOneByAuthToken(authToken))) {
        console.log(`invalid authToken: ${authToken}`)
        return res.status(403).send('403 Forbidden')
    }

    await next()
}

exports.checkPermission = _checkPermission