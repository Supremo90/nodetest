var http = require('http');
var dt = require('./logger');
const hostname = '127.0.0.1';
const port = 3001;

const server2 = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("The date and time is currently: " + dt.myDateTime());
  res.end();
});

server2.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });