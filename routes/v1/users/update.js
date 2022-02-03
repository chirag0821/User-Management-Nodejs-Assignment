const fs = require("fs");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const express = require('express');
const app = express();

app.use(express.json());

module.exports = () => {
    return (req, res) => {
        fs.readFile("db.json", "utf8", (error, data) => {
            if (error) {
                res.send("Error to read file");
            }
            else {
                let token = req.headers.token.split(' ')[1]
                var decoded = jwt.verify(token, 'mybestkey');
                const arr = JSON.parse(data);
                const index = arr.findIndex(p => p.Email == decoded.Email);
                var datas = arr.splice(index, 1);
                const keyss = Object.keys(req.body)
                for (let i = 0; i < keyss.length; i++) {
                    if (keyss[i] == "Name") {
                        datas[0].Name = req.body.Name;
                    }
                    else if (keyss[i] == "Mobile") {
                        datas[0].Mobile = req.body.Mobile;
                    }
                    else if (keyss[i] == "ProfilePicture") {
                        datas[0].Mobile = req.body.ProfilePic;
                    }
                }
                arr[index] = datas[0];
                const d1 = JSON.stringify(arr);
                fs.writeFile("db.json", d1, error => {
                    if (error) {
                        return res.send("Error to write file");
                    }
                    else {
                        res.send("Done updation");
                    }
                })
            }
        })
    }
}