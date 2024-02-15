const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    bodyParser.urlencoded({
        extended: true
    }),
);

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, './build')))

app.get('/api/data', async (req, res) => {

    //code

    res.status(200);
    // res.send(data);
});


app.use(function (req, res, next) {
    res.sendFile(path.join(__dirname, './build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});

module.exports = app;