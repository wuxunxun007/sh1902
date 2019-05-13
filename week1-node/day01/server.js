/**
 * https://www.baidu.com   《==》 https://www.baidu.com:443
 * http://www.test.com:3000
 * http://12.34.56.78:8000
 * 
 * 协议
 * 域名
 * 端口
 */

 // 引入http原生（核心）模块  ---- 协议
const http = require('http');

// 域名 localhost / 0.0.0.0 / 127.0.0.1
// 基于http协议创建服务器
// req  --- request  ---  请求
// res  --- response ---  响应
const server = http.createServer(function (req, res) {

  // 设置头信息
  // 200 请求成功
  // 内容类型 text/plain（如果内容有标签，原样输出-转义输出）
  //          text/html  (解析输出)
  res.writeHead(200, {
    'Content-type': 'text/html;charset=utf-8'
  });

  res.write('<h1>hello 1902</h1>');
  res.write('<h1>hello node</h1>');
  res.end(); // 有且只能有1个，不能在它之后再调用write方法



});

// 端口
server.listen(3000);

console.log('your server is running at http://localhost:3000')