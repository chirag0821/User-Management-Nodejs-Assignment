const app = require('express').Router();

module.exports = ()=>{
    app.post('/login', require('./login')());
    app.post('/register',require('./register')());
    app.get('/otherusers',require('./otherusers')());
    app.get('/personaldetails',require('./personaldetails')());
    app.get('/update',require('./update')());
    app.get('/updatepass',require('./updatepass')());
    return app;
}