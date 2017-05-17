'use strict';

const config = require('./config');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, './view')));

app.listen(config.port, () => {
    console.log(`movie-db dev-server running on ${config.port}`);
});