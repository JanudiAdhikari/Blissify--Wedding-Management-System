const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { Dropbox } = require('dropbox');
const fetch = require('isomorphic-fetch');
const app = express();
require ("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb connection success!");
})


const dbx = new Dropbox({
    clientId: process.env.DROPBOX_CLIENT_ID,
    fetch: fetch
});

app.get('/auth/dropbox', (req, res) => {
    const authUrl = dbx.getAuthenticationUrl('http://localhost:3000/auth/dropbox/callback');
    res.redirect(authUrl);
});


app.get('/auth/dropbox/callback', async (req, res) => {
    const { code } = req.query;

    try {
       
        const response = await dbx.getAccessTokenFromCode('http://localhost:3000/auth/dropbox/callback', code);

        dbx.setAccessToken(response.result.access_token);
        res.send('Authenticated with Dropbox!');
    } catch (error) {
        console.error('Error authenticating with Dropbox:', error);
        res.status(500).send('Failed to authenticate with Dropbox');
    }
});

const mediaRouter = require("./routes/media.js");

app.use("/media",mediaRouter);

app.listen(PORT, () => {
    console.log('server is up and running on port no: ${PORT}')
})