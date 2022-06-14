let express = require('express');
let app = express();
require('dotenv').config();
var bodyParser = require('body-parser');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Define html absolute path
const abs_html_path = __dirname + '/views/index.html'

// Define static aboslute path
const abs_static_path = __dirname + '/public';

// Return current server time
getCurrentTimeToString = () => new Date().toString();

// The root-top-middleware
app.use((req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
})

app.use(urlencodedParser);

app.get('/', (req, res) => res.sendFile(abs_html_path));
app.use('/public', express.static(abs_static_path));
app.use('/json', (req, res) => {
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        res.json({ "message": "HELLO JSON" });
    } else {
        res.json({ "message": "Hello json" });
    }
});
app.get('/now', (req, res, next) => {
    req.time = getCurrentTimeToString();
    next()
}, (req, res) => {
    res.json(
        { time: req.time }
    );
});

// Use req.params
app.get('/:word/echo', (req, res) => {
    const { word } = req.params;
    res.json({
        echo: word
    })
})

// Use req.query
app.get('/name', (req, res) => {
    const { first, last } = req.query;
    res.json({
        name: first + " " + last
    })
})

// Use post
app.post('/name', (req, res) => {
    const { first, last } = req.body;
    res.json({
        name: `${first} ${last}`
    })
})

module.exports = app;
