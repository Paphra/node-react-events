var express = require('express');
var router = express.Router()
var controller = require('../controllers/cSubscriber');

router.get('/:id', controller.getSingleSubscriber);
router.post('/:id', controller.updateSubscriber);
router.delete('/:id', controller.deleteSubscriber);
router.get('/', controller.getAllSubscribers);
router.post('/',controller.saveSubscriber);

module.exports = router;
