const router = require('express').Router();
const controller = require('./user.controller');

// // // //
// GET /user/:id
router.get('/:id', controller.userInfo);

// POST /user
router.post('/', controller.create);

// PUT /user/:id
router.put('/:id', controller.update);

// DELETE /user/:id
router.delete('/:id', controller.delete);

// // // //

module.exports = router;