const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  console.log(req.url);
  res.setHeader('Content-Type', 'text/html');
  res.write('<h1>Hello World</h1>');
  res.end();
});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

res.setHeader('Location', '/about');
res.end();