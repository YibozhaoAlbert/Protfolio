const express = require('express');
const app = express();
app.use(express.static('public'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

let server = app.listen(8800, function(){
    console.log('The server is running on the port 8800.');
});