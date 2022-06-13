let express = require('express');
let app = express();
require('dotenv').config();


// Define html absolute path
const abs_html_path = __dirname + '/views/index.html'

// Define static aboslute path
const abs_static_path = __dirname + '/public';

// The root-top-middleware
app.use((req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
})

app.get('/', (req, res) => res.sendFile(abs_html_path));
app.use('/public', express.static(abs_static_path));
app.use('/json', (req, res) => {
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        res.json({ "message": "HELLO JSON" });
    } else {
        res.json({ "message": "Hello json" });
    }
})



module.exports = app;
