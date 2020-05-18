var express = require('express');
var router = express.Router()
var controller = require('../controllers/cAbout');

router.get( '/', controller.getAbout);
router.post( '/', controller.saveAbout );

module.exports = router;
