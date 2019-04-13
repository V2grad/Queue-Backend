const router = require('express').Router();
const controller = require('./record.controller');

// // // //
// GET /record/:id
router.get('/:id', controller.show);

// POST /record
router.post('/', controller.create);

// PUT /record/:id
// Update status
router.put('/:id', controller.update);

// DELETE /record/:id
// router.delete('/:id', controller.delete);

// // // //

module.exports = router;