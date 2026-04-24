const express = require('express');
const router = express.Router();
const controller = require('./controller');
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Public routes
router.post('/register', upload.single('profilePhoto'), controller.registerUsers);
router.post('/login', controller.loginUsers);
router.post('/logout', controller.logoutUser);

// Protected routes
router.get('/users', controller.getUsers);
router.get('/user/:id', controller.getUserById);
router.get('/verify', controller.verifyUser);
router.get('/profile', controller.getProfile);
router.put('/user/:id', controller.updateUser);
router.delete('/user/:id', controller.deleteUser);
router.get('/search', controller.searchUsers);

module.exports = router;