
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {

  if (req.url !== '/favicon.ico') {
    console.log(req.url)
    console.log(url.parse(req.url).query)
    console.log(querystring.parse(url.parse(req.url).query))
  }

  res.writeHead(200, {
    'Content-type': 'text/html;charset=utf-8'
  });

  res.write('<h1>hello 1902</h1>');
  res.write('<h1>hello node</h1>');
  res.end();
});

server.listen(3000);

console.log('your server is running at http://localhost:3000')