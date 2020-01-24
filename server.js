const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// app.use (express.static( __dirname + '/public'));
app.use(bodyParser.json());
// app.use(express.static(__dirname + '/public/dist/public'));
app.use(express.static(path.join( __dirname, './public/dist/public' )));
require('./server/routes')(app);
require('./server/models');

const server = app.listen(8000, () => {
	console.log('server listening on port 8000');
})