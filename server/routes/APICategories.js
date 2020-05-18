var express  = require('express')
var router = express.Router();
var controller = require('../controllers/cCategories');

router.get('/:id', controller.getSingleCategory);
router.post('/:id', controller.updateCategory);
router.delete('/:id', controller.deleteCategory);
router.get('/', controller.getAllCategories);
router.post('/', controller.saveCategory);

module.exports = router;
