const router = require('express').Router();
const controller = require('./event.controller');

// // // //
// GET /event/:id
router.get('/:id', controller.show);

// POST /event
router.post('/', controller.create);

// PUT /event/:id
// Update status
router.put('/:id', controller.update);

// DELETE /record/:id
router.delete('/:id', controller.delete);

// // // //

module.exports = router;