const router = require('express').Router()

// // // //

// Bootstrap API module routers
router.use('/event', require('./api/event'))
router.use('/users', require('./api/user'))
router.use('/record', require('./api/record'))
// // // //

module.exports = router