
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {

  // req.url为地址栏的地址
  // console.log(req.url)

  if (req.url !== '/favicon.ico') {
    console.log(req.url)
    console.log(url.parse(req.url, true).query)
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