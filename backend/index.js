const express = require("express");
const cors = require("cors");
const axios = require("axios"); // Import axios
require('dotenv').config();

const app = express();
const PRIVATE_KEY = process.env.CHAT_ENGINE_PRIVATE_KEY

console.log(PRIVATE_KEY) // debugging line

app.use(express.json());
app.use(cors({ origin: true }));


app.post("/authenticate", async (req, res) => {
    const { username } = req.body;
    try {
        const r = await axios.put(
            "https://api.chatengine.io/users/", 
            { username: username, secret: username, first_name: username },
            { headers: {"private-key": PRIVATE_KEY}}
        );
        return res.status(r.status).json(r.data);
    } catch (e) {
        console.log(`That's the dubugging line\n\n ${e}`);
        return res.status(e.response.status).json(e.response.data);
    }
});

app.listen(3001);