const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = './db.json';
const app = express();
const PORT = 3000;
const JWT_SECRET = "USER_APP";

app.use(express.json());


async function readData(){
    try{
        const data = await fs.readFile(path, 'utf8')
        return JSON.parse(data);
    } catch (err) {
        return []
    }
}

async function updateData(data){
    try{
        await fs.writeFile(path, JSON.stringify(data, null, 2), 'utf8')
        return;
    } catch (err) {
        console.log(err);
    }
}


function generateRandomString(length) {
    const characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters[Math.floor(Math.random() * characters.length)];
    }
    return result;
  }

app.post("/signup", async function(req, res){
    const users = await readData();
    const username = req.body.username;
    const password = req.body.password;
    const user = users.find(user => user.username === username && user.password === password);

    if (user){
        res.status(402).send({
            message: "You have already signed up!"
        })
    } else{
        users.push({
            "username": username,
            "password": password
        })

        console.log(users);
        await updateData(users);
        res.send("Sign Up Completed! Welcome onboard!")
    }

})

app.post("/signin", async function(req, res){
    const users = await readData();
    const username = req.body.username;
    const password = req.body.password;
    const user = users.find(user => user.username === username && user.password === password);
    if (user){
        // convert their username to jwt
        const token = jwt.sign({
            username: user.username
        }, JWT_SECRET);

        res.send({
            token
        })
        console.log(users);
    } else{
        res.status(409).send({
            message: "Invalid username or password"
        })
    }

})

app.get("/me", async (req, res) => {
    const token = req.headers.authorization;
    const decodedInfo = jwt.verify(token, JWT_SECRET)
    // const user = users.find((user) => user.token === token)
    if (decodedInfo){
        res.send({
            username: decodedInfo.username
        })
    } else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
})

app.listen(PORT);