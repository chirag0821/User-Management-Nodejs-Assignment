const express = require('express');
const app = express();
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;


const routesController = require('./routes/v1')();

const port = 5000;

app.get('/', (req, res) => {
    res.send(`Hi from get`);
});

app.use(express.json())

app.use('/usermanagement', routesController);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});



