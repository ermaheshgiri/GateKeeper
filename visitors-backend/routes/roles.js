const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const roleCheck = require('../middleware/roleMiddleware');
const roleController = require('../controllers/roleController');

router.use(auth, roleCheck(['Admin'])); // only Admin can manage roles
router.get('/', roleController.list);
router.post('/', roleController.create);
router.put('/:id', roleController.update);
router.delete('/:id', roleController.remove);

module.exports = router;
