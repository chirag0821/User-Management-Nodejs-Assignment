const app = require('express').Router()

module.exports = ()=>{
    app.use('/user',require('./users')());
    return app;
}