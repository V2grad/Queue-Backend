const router = require('express').Router()

// // // //

// Bootstrap API module routers
router.use('/events', require('./api/event'))
router.use('/users', require('./api/user'))
router.use('/records', require('./api/record'))
// // // //

module.exports = router