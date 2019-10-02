// 公共配置文件
const path = require('path');

const config = {
    // 项目启动监听的端口
    port: 3000,

    publicDir: path.resolve(__dirname, './public'),
    logPath: path.resolve(__dirname, './logs/koa-template.log'),

    // 数据库配置
    database: {
        HOST    : 'xxx',    // 数据库地址
        USERNAME: 'xxx',    // 用户名
        PASSWORD: 'xxx',    // 用户密码
        DATABASE: 'xxx',    // 数据库名
        PORT    : 3306      // 数据库端口
    }
};

module.exports = config;
