var express  = require('express')
var router = express.Router();
var controller = require('../controllers/cEvents');

router.get('/:id', controller.getSingleEvent);
router.get('/slug/:slug', controller.getSingleEventSlug);
router.post('/:id', controller.updateEvent);
router.delete('/:id', controller.deleteEvent);
router.get('/', controller.getAllEvents);
router.post('/', controller.saveEvent);

module.exports = router;
