const express = require('express'); // 第三方模块

// 实例化一个express对象
const app = express();

app.get('/', (req, res) => {
  res.send('hello 1902');
})

app.get('/login', (req, res) => {
  console.log(req.query)
  res.send('登录')
})

app.get('/test', (req, res) => {
  res.send('测试')
})

app.listen(3000, () => {
  console.log('your server is running at http://localhost:3000');
})
