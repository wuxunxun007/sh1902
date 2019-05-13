[toc]
# 一、复习nodejs

## 1、nodejs服务器

``` server.js
const http = require('http');

const server = http.createServer((req, res) => {
    
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    });
    
    res.write('hello 1902');
    
    res.write('<h1>hello node</h1>');
    
    res.end();
    
})
```

## 2、nodejs核心模块_[url](http://nodejs.cn/api/url.html)

### 2.1 控制台学习url模块

> 控制台输入node指令

* url.parse(str[, bool])

> 将url地址解析成为一个对象

> bool代表可选参数，默认值为false，如果值为true，表示query选项是一个对象

如果只有第一个参数

```
url.parse('http://localhost:3000/api?course=node&class=1902#url')
```

控制台输出

```
Url {
  protocol: 'http:', // 协议
  slashes: true,
  auth: null,
  host: 'localhost:3000', // 域名 + 端口
  port: '3000', // 端口号
  hostname: 'localhost', // 域名
  hash: '#url', // 哈希值
  search: '?course=node&class=1902', // ？ + 参数
  query: 'course=node&class=1902', // 字符串形式的参数
  pathname: '/api', // 路由 --- 标识的是哪一个页面或者哪一个接口
  path: '/api?course=node&class=1902', // 路由 + search
  href: 'http://localhost:3000/api?course=node&class=1902#url' }
```

如果传入第二个参数并且值为true

```
url.parse('http://localhost:3000/api?course=node&class=1902#url', true)
```

控制台输出

```
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'localhost:3000',
  port: '3000',
  hostname: 'localhost',
  hash: '#url',
  search: '?course=node&class=1902',
  query: { course: 'node', class: '1902' }, // *****************
  pathname: '/api',
  path: '/api?course=node&class=1902',
  href: 'http://localhost:3000/api?course=node&class=1902#url' }
```

### 2.2 url模块结合nodejs的服务器

``` url+server.js
const http = require('http');
const url = require('url');
const server = http.createServer((req, res) => {
    // req.url为地址栏的地址
    console.log(req.url)
    res.writeHead(200, {
        'Content-type': 'text/html;charset=utf-8'
    });
    res.write('<h1>hello 1902</h1>');
    res.write('<h1>hello node</h1>');
    res.end();
});
server.listen(3000);
console.log('your server is running at http://localhost:3000')
```
> 使用node url+server.js运行，发信打印出如下信息

```
/api?course=node&class=1902
/favicon.ico
```
第一行是我们想要的，第二行是代表的浏览器中的图标，可以过滤掉它

```
if (req.url !== '/favicon.ico') {
    console.log(req.url)
}
```
运行结果

```
/api?course=node&class=1902
```
如果想要获取到参数

```
if (req.url !== '/favicon.ico') {
    console.log(req.url);
    console.log(url.parse(req.url, true)); // url.parse(str, true)
}
```
得到结果如下

```
/api?course=node&class=1902
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?course=node&class=1902',
  query: { course: 'node', class: '1902' },
  pathname: '/api',
  path: '/api?course=node&class=1902',
  href: '/api?course=node&class=1902' }
```

*  url.parse(req.url, true).query获取到参数信息

*  url.parse(req.url, true).pathname获取到路由信息

*  url.parse(req.url, true).port获取到端口号

*  url.parse(req.url, true).protocol获取到协议信息

*  url.parse(req.url, true).hostname获取到域名信息

## 3.nodejs核心模块_[querystring](http://nodejs.cn/api/querystring.html)

### 3.1 控制台学习querystring

> 控制台输入node指令

* querystring.parse(str)

> 将字符串形式的参数解析成为一个对象

```
querystring.parse('course=node&class=1902')
```
输出结果为

```
{ course: 'node', class: '1902' }
```

### 3.2 node服务器结合querystring

```url+qs+server.js
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {

  if (req.url !== '/favicon.ico') {
    console.log(req.url)
    console.log(url.parse(req.url).query)
    console.log(querystring.parse(url.parse(req.url).query)) //**********************
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
```
> 在真实项目中其实一般不需要使用querystring,会使用url.parse(str, url)代替

## 4、服务器相关知识

### 4.1 什么是服务器

> 服务器，也称伺服器，是提供计算服务的设备。由于服务器需要响应服务请求，并进行处理，因此一般来说服务器应具备承担服务并且保障服务的能力。

> 在网络环境下，根据服务器提供的服务类型不同，分为文件服务器、数据库服务器、应用程序服务器、WEB服务器等。

### 4.2 前后端分离与耦合架构的概念
 **前后端分离**
 
 >前端HTML页面通过Ajax调用后端的RestFul API并使用Json数据进行交互
 
![e2f138544dc262a072afb9da89147a81.png](en-resource://database/1184:1)

 
 
 **前后端耦合---传统的系统架构**
 
 >前端写完的HTML页面交给后端，后端负责渲染数据，前后端相互调整的方式
 
 ![2ae972c245581ea4cb6a61781df4e63d.png](en-resource://database/1182:1)
 
 ## 5、express基础
 
 ### 5.1 express介绍
 
>  [Express](http://www.expressjs.com.cn/)基于 Node.js 平台，快速、开放、极简的 Web 开发框架

> Express 是一个保持最小规模的灵活的 Node.js Web 应用程序开发框架，为 Web 和移动应用程序提供一组强大的功能

#### 5.1.1 使用express创建服务器

a)、安装express

```
npm install express --save
npm install express -S
npm i express -S
```
> 可以使用[淘宝镜像cnpm](http://npm.taobao.org/)代替npm

在控制台中输入如下指令，以后即可使用cnpm代替npm

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

b)、 创建一个express服务器

* 创建一个文件夹expressserver,进入文件夹并且安装express

```
mkdir expressserver
cd expressserver
cnpm i express -S
```
* 创建index.js

```
const express = require('express'); // 第三方模块

// 实例化一个express对象
const app = express();

app.get('/', (req, res) => {
  res.send('hello 1902');
})

app.get('/login', (req, res) => {
  res.send('登录')
})

app.get('/test', (req, res) => {
  res.send('测试')
})

app.listen(3000, () => {
  console.log('your server is running at http://localhost:3000');
})

```
假设浏览器地址栏中地址为 
http://localhost:3000/login?username=wudaxun&password=123
> 匹配的是/login这个路由
> **nodejs原生**: url.parse(req.url, true).query
> **express**: req.query

```
app.get('/login', (req, res) => {
    console.log(req.query)
    res.send('登录')
})
```

#### 5.1.2 [express生成器](http://www.expressjs.com.cn/starter/generator.html)直接生成项目 --- 脚手架

通过应用生成器工具 express-generator 可以快速创建一个应用的骨架
express-generator 包含了 express 命令行工具

a)、安装express项目生成器

```只需要在第一次时执行
cnpm i express-generator -g
```

b)、使用命令创建项目

> --view=ejs 并不是必须得加的，如果不加，最终默认的模板是jade语法，相比ejs语法，jade语法的学习成本更高

> npm/cnpm start可以启动服务器，是因为package.json文件中scripts选项做了配置

```
express proname --view=ejs
cd proname
cnpm i
cnpm start  （node ./bin/www）
```

c)、了解项目目录结构
* <u>*bin*</u>
   www // 服务器 运行的入口文件 npm start -- node ./bin/www
* <u>*node_modules*</u> // 在项目中需要使用到的第三方模块
* <u>*public*</u> // 静态的资源文件夹
    images
    javascripts
    stylesheets
* <u>*routes*</u> // 路由或者是接口的定义
    index.js
    users.js
* <u>*views*</u> // 路由所对应的页面
    error.ejs
    index.ejs
* app.js // 应用各种中间件，设置静态资源文件夹，注册各个路由或者接口
* package.json // 描述文件，列举了项目需要使用到的依赖以及运行命令、版本号等

#### 5.1.3 [静态文件](http://www.expressjs.com.cn/starter/static-files.html)资源托管（static)

> 为了提供诸如图像、CSS 文件和 JavaScript 文件之类的静态文件，请使用 Express 中的 express.static 内置中间件函数。

在本项目中app.js处有这样一句话

``` app.js 20行（不是固定值）
app.use(express.static(path.join(__dirname, 'public')));
```
就可以在views/index.ejs中使用了

``` views/index.ejs   /其实代表的就是public文件夹
<link rel='stylesheet' href='/stylesheets/style.css' />
```

#### 5.1.4 [路由](http://www.expressjs.com.cn/starter/basic-routing.html)

> 路由是指确定应用程序如何响应对特定端点的客户端请求，该请求是URI（或路径）和特定HTTP请求方法（GET，POST等）。每个路由都可以有一个或多个处理函数，这些函数在路由匹配时执行。

```
app.METHOD(PATH, HANDLER)
```
* app是一个实例express。
* METHOD是一个HTTP请求方法，小写。
* PATH 是服务器上的路径。
* HANDLER 是路由匹配时执行的功能。

#### 5.1.5 [中间件](http://www.expressjs.com.cn/guide/using-middleware.html)

> 中间件函数是可以访问请求对象 （req），响应对象（res）以及next应用程序请求 - 响应周期中的函数的函数。该next功能是Express路由器中的一个功能，当被调用时，它将执行当前中间件之后的中间件。
可以使用 app.use() 调用中间件

app.js中使用的app.use()都属于

## 6、[ejs](https://ejs.bootcss.com/)模板的用法

> EJS 是一套简单的模板语言，帮你利用普通的 JavaScript 代码生成 HTML 页面。EJS 没有如何组织内容的教条；也没有再造一套迭代和控制流语法；有的只是普通的 JavaScript 代码而已。

routes/index.js

```
router.get('/', function(req, res, next) {
    res.render('index', {
        title: '<mark>Express</mark>',
        list: [ 'a', 'b', 'c', 'd'],
        flag: true
    });
});
```

* 前端ejs模板中使用变量

```
<%- title %>  // 解析
<%= title %>  // 转义 --- 原样输出
```

* 给一个页面导入一个代码片段（首页中导入共同头部）--- 包含语法

```
<%- include('./header.ejs') %>
```

* 条件判断

``` 先写js语句，然后添加<%%>
<% if (!flag) { %>
    <ul>
        <li>week1</li>
    </ul>
<% } %>
```
* 循环语句

``` 先写js循环,，然后添加<%%>，内部元素使用变量语法 <%- %>
<% for (var i = 0; i < list.length; i++) { %>
    <p><%- list[i] %></p>
<% } %>
```

## 7、作业

* 7.1 安装脚手架，创建项目，熟悉每个文件目录的含义

* 7.2 熟悉ejs的模板语法

* 7.3 尝试把2阶段项目的首页放入本服务器

* 7.4 下载bootstrap项目模板


百度网盘下载 链接：[https://pan.baidu.com/s/128UX3FzlkkNNYc3IoR5jvA](https://pan.baidu.com/s/128UX3FzlkkNNYc3IoR5jvA) 提取码：lbbg

* 7.5安装数据库相关软件

    7.5.1 安装mongodb
    
百度网盘下载: 链接：[https://pan.baidu.com/s/1mIbNrhzFMzMzB3jLs92Dsg](https://pan.baidu.com/s/1mIbNrhzFMzMzB3jLs92Dsg) 

提取码：o8pw

> 系统d盘创建文件夹mongdb，下载到该文件夹并且解压


   7.5.2 安装mongodb可视化工具
    
百度网盘下载: 链接：[https://pan.baidu.com/s/1jpI4Oe1AqugE8XRfNWz75w](https://pan.baidu.com/s/1jpI4Oe1AqugE8XRfNWz75w) 提取码：6k8i

