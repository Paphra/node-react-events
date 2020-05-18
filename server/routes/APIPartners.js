var express  = require('express')
var router = express.Router();
var controller = require('../controllers/cPartners');

router.get('/:id', controller.getSinglePartner);
router.post('/:id', controller.updatePartner);
router.delete('/:id', controller.deletePartner);
router.get('/', controller.getAllPartners);
router.post('/', controller.savePartner);

module.exports = router;
