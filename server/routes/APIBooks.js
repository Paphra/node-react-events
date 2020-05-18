var express  = require('express')
var router = express.Router();
var controller = require('../controllers/cBooks');

router.get('/:id', controller.getSingleBook);
router.post('/:id', controller.updateBook);
router.delete('/:id', controller.deleteBook);
router.get('/', controller.getAllBooks);
router.post('/', controller.saveBook);

module.exports = router;
