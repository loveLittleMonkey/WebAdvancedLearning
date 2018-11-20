# node

## 提供了一下接口
* File System   文件操作
* HTTP          web服务
* OS            操作系统调用
* C++ Addons    调用C++ 模块
* ...

## 应用
* web服务器
* 本地应用
* 构建工具
* ...

## npm
npm包需要遵循规范，在包的根目录下新建一个package.json，说明相关的信息，比如名字，版本，描述，依赖，相关的关键词，作者，开源许可等，方便npm识别和管理。
### 安装
npm install '包名'，之后在node_modules中可以查看到下载的包

使用-h来查看相关的操作指令

uglify-js  可以压缩js代码

node.js内置的模块不需要再安装，直接引入即可，比如文件读取模块fs(file system)

详情看node_demo