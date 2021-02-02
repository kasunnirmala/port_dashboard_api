const express = require('express');
const app = express();
var http = require('http').createServer(app);
require('./db');
const bodyParse = require('body-parser');
const cors = require('cors');

const io = require('socket.io')(http);
const GasRoute = require('./routes/gas-sensor');
const WeatherRoute = require('./routes/weather');
const ShedRoute = require('./routes/shed-data');
const VehicleRoute = require('./routes/vehicle');


app.use(cors());

app.use(bodyParse.json({ limit: '50mb', extended: true }));
app.use(bodyParse.urlencoded({ limit: '50mb', extended: true }));


app.use('/api/v1/gas', GasRoute);
app.use('/api/v1/weather', WeatherRoute);
app.use('/api/v1/shed', ShedRoute);  
app.use('/api/v1/vehicle', VehicleRoute);  

// io.on('connection', (socket) => {
//   console.log('USER CONNECTED ' + socket.client.conn.id);
//   module.exports = socket;
//   //  socket.emit('msg',"Connected");
// });


// http is used to use this for io socket in future
http.listen(2431, () => {
  console.log('listening on *:2431');
});
