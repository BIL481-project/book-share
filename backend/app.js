const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use(express.json());

app.use('/', routes);

module.exports = app;