let express = require('express');
let app = express();


const _path = __dirname + '/views/index.html'

app.get('/', (req,res) => res.sendFile(_path));


module.exports = app;
