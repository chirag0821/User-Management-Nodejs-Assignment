const fs = require("fs");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const express = require('express');
const app = express();

app.use(express.json());

module.exports = ()=>{
    return (req,res)=>{
        fs.readFile("db.json", "utf8", (error, data) => {
            if (error) {
                res.send('Error to read file');
            }
            else {
                const arr = JSON.parse(data);
                // res.send(`${req.body}`);
                
                // console.log(d);
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].Email === req.body.Email) {
                        let token = jwt.sign({ Email: req.body.Email }, "mybestkey", { expiresIn: "12h" })
                        return res.send({ Status: "Logged in succesfully", Token: token });
                    }
                }
                return res.send("Wrong id or password");
            }
        })
    }
}