const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');
const auth = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'uploads/'); },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + Math.round(Math.random()*1e9) + ext);
  }
});
const upload = multer({ storage });

router.use(auth);

router.get('/reports/export', visitorController.exportCSV);
router.get('/', visitorController.list);
router.get('/:id', visitorController.get);
router.post('/', visitorController.create);
router.put('/:id', visitorController.update);
router.post('/:id/checkin', upload.single('photo'), visitorController.checkin);
router.post('/:id/checkout', visitorController.checkout);

module.exports = router;
