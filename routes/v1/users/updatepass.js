const fs = require("fs");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const express = require('express');
const app = express();

app.use(express.json());

module.exports = () => {
    return (req, res) => {
        // res.send('imp');
        fs.readFile("db.json", "utf8", (error, data) => {
            if (error) {
                res.send("Error from read");
            }
            else {
                let token = req.headers.token.split(' ')[1]
                var decoded = jwt.verify(token, 'mybestkey');
                const arr = JSON.parse(data);
                const index = arr.findIndex(p => p.Email == decoded.Email);
                var datas = arr.splice(index, 1);

                if (bcrypt.compareSync(req.body.CurPass, datas[0].Password) && req.body.NewPass == req.body.ConfirmPass && req.body.NewPass.length >= 7) {
                    const hash = bcrypt.hashSync(req.body.NewPass, saltRounds);
                    datas[0].Password = hash;
                    data[index] = datas[0];
                    const d1 = JSON.stringify(arr);
                    fs.writeFile("db.json", d1, error => {
                        if (error) {
                            return res.send("Error from write");
                        }
                        else {
                            return res.send("Password Changed Successfully");
                        }
                    })
                }
                else {
                    return res.send("Something went wrong");
                }
            }
        })
    }
}