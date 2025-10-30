// routes/contentRoutes.js
// const express = require('express');
import express from 'express';
const router = express.Router();
// const { uploadContent } = require('../controllers/contentController');
import { uploadContent } from '../controllers/contentController.js';

router.post('/upload', uploadContent);

// module.exports = router;
export default router;
