let express = require('express');
let app = express();

// Define html absolute path
const abs_html_path = __dirname + '/views/index.html'

// Define static aboslute path
const abs_static_path = __dirname + '/public';

app.get('/', (req,res) => res.sendFile(abs_html_path));
app.use('/public',express.static(abs_static_path));
app.use('/json', (req,res) => {
    res.json({
        "message": "Hello json"
    })
} )



module.exports = app;
