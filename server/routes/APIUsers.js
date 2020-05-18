var express  = require('express')
var router = express.Router();
var controller = require('../controllers/cUsers');

router.get('/:id', controller.getSingleUser);
router.post('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);
router.get('/', controller.getAllUsers);
router.post('/', controller.saveUser);

module.exports = router;
