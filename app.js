// app.js
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// const contentRoutes = require('./routes/contentRoutes');
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import contentRoutes from './routes/contentRoutes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/content', contentRoutes);

// Server
app.listen(PORT, () => {
  console.log(`Server RUNNING at port: ${PORT}`);
});
