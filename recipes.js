const express = require('express');
const router = express.Router();
const recipesCtrl = require('../controllers/recipes');

router.get('/', recipesCtrl.index);
router.get('/:id', recipesCtrl.show);
router.post('/', recipesCtrl.uploadMiddleware, recipesCtrl.create);
router.put('/:id', recipesCtrl.uploadMiddleware, recipesCtrl.update);
router.delete('/:id', recipesCtrl.destroy);

module.exports = router;