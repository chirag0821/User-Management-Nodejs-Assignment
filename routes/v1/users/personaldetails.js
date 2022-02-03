const fs = require("fs");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const express = require('express');
const app = express();

app.use(express.json());

module.exports = () => {
    return (req, res) => {
        fs.readFile("db.json", "utf8", (error, data) =>{
            if(error){
                res.send("Error to read file");
            }
            else{
                let token = req.headers.token.split(' ')[1]
                var decoded = jwt.verify(token, 'mybestkey');
                const arr = JSON.parse(data);
                const ind = arr.findIndex(p => p.Email == decoded.Email);
                var detail = arr.splice(ind, 1);
                return res.send(detail);       
            }
        })
    }
}