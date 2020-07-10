首先你要准备一个Node.js

Node.js：

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。 

Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。 

Node.js 的包管理器 npm，是全球最大的开源库生态系统。

npm：
npm全称为Node Package Manager，是一个基于Node.js的包管理器，也是整个Node.js社区最流行、支持的第三方模块最多的包管理器(类似于java中的Maven)。

下载地址:[Node.js官方下载地址](https://nodejs.org/en/)
进去后如果你是windows系统直接点![](https://img-blog.csdnimg.cn/20200628141052557.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM5MjIwNzQ4,size_16,color_FFFFFF,t_70)
之后一路next就ok
如果你想配置node.js的安装路径可以看看其他博客，本文不再赘述
下载好之后验证一下
输入命令:`node -v`
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200628141319563.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM5MjIwNzQ4,size_16,color_FFFFFF,t_70)
出现如下版本号 既为安装成功

再安装vue构建工具的脚手架
`npm install --g @vue/cli`

安装好后就可以使用webstorm来构建vue项目了
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200628141952494.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM5MjIwNzQ4,size_16,color_FFFFFF,t_70)
创建好之后为以下结构
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200628142050400.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM5MjIwNzQ4,size_16,color_FFFFFF,t_70)
由于是使用vuecli3来构建的项目相较于vuecli2来说少了cnfig目录
要是想配置端口转发的话
需要自己在项目根目录创建一个  vue.config.js 的文件在里面做端口转发操作
```javascript
let proxyObj = {};
proxyObj['/ws'] = {
    ws: true,
    target: "ws://localhost:8081"
};

proxyObj['/'] = {
    ws: false,
    target: "http://localhost:8081",
    changeOrigin: true,
    pathRewrite: {
        '^/': ''
    }
};
module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: proxyObj
    }
}
```
1. 第一个proxyObj是拦截所有以‘ws’开头请求的websocket进行转发(新手可以不配置)
2. 第二个是拦截所有 HTTP 请求，将之转发到后端服务器上（前端默认端口是 8080），后端的端口是 8081，如果大家有统一的请求前缀那么可以写成`/xxx`
`devServer`:里配置你个人的 host、前端占用端口、转发规则
