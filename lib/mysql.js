// 连接 MySQL 数据库配
const mysql = require('mysql');
const config = require('../config');

const pool = mysql.createPool({
    host    : config.database.HOST,         // 数据库地址
    user    : config.database.USERNAME,     // 用户名
    password: config.database.PASSWORD,     // 用户密码
    database: config.database.DATABASE,     // 数据库名
});

/**
 * 封装编写 SQL 的方法
 * @param sql { String } [ 接收的SQL语句 ]
 * @param arr { Array } [ 接受的参数, 参数为一个数组的形式 ]
 * @param callback { Function } [ 返回结果 ]
 * @returns {Promise<unknown>}
 */
let createPool = (sql, arr, callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
            return;
        }
        connection.query(sql, arr, (err, results, fields) => {
            connection.release();
            if (err) throw err;
            callback && callback(results, fields);
        });
    });
};

module.exports = (sql, arr) => {
    let result = new Promise((resolve, reject) => {
        createPool(sql, arr, (err, results, fields) => {
            if (err) reject(err);
            resolve(results);
        });
    }).then(res => {
        return res;
    }).catch(err => {
        return err;
    });
    return result;
};
