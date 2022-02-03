const fs = require("fs");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const express = require('express');
const app = express();

app.use(express.json());

module.exports = () => {
    return (req, res) => {
            // res.send(req.body);
        fs.readFile("db.json", "utf8", (error, data) => {
            if (error) {
                return res.send("Error to read file");
            }
            else {
                if (data.length < 1) {
                    if (req.body.Password.length >= 7) {
                        const hash = bcrypt.hashSync(req.body.Password, saltRounds);
                        req.body.Password = hash
                        console.log("Inter")
                        const d1 = JSON.stringify([req.body]);
                        console.log(d1);
                        fs.writeFile("db.json", d1, error => {
                            if (error) {
                                return res.send("Error to write file");
                            }
                            else {
                                return res.send({ Message: "Registration Successful" });
                            }
                        })
                    }
                }
                else {
                    const arr = JSON.parse(data);
                    if (req.body.Password.length >= 7) {
                        const hash = bcrypt.hashSync(req.body.Password, saltRounds);
                        req.body.Password = hash
                        arr[arr.length] = req.body;
                        const d1 = JSON.stringify(arr);
                        fs.writeFile("db.json", d1, error => {
                            if (error) {
                                return res.send("Error to write file");
                            }
                            else {
                                return res.send({ Message: "Regsitration Successfull" });
                            }
                        })
                    }
                    else {
                        return res.send("Password must be atleast 7char long");
                    }
                }
            }
        })
    }
}




