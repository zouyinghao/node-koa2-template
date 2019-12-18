// 引入用户表 SQL语句
const controllers = require('../../mysql/test');
const _message = require('../../lib/errorCode');

// 创建用户 Object
const test = {};

/**
 * 查询用户
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
test.searchUserInformation = async (ctx, next) => {
    await controllers.list().then(result => {
        ctx.result = result;
    });
    await next();
};

/**
 * 创建用户
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
test.insertUserInformation = async (ctx, next) => {
    const { phone } = ctx.request.body;
    let status = true;
    await controllers.list().then(async result => {
        for (let item of result){
            if (item.phone === phone){
                status = false;
                ctx.code = "1001";
                ctx.message = _message["1001"];
                await next();
                return;
            }
        }
    });
    if (!status) return;
    await controllers.insert(ctx.request.body).then(result => {
        if (result.affectedRows === 1){
            ctx.result = result.insertId;
        } else {
            ctx.code = "1002";
            ctx.message = _message["1002"];
            ctx.result = null;
        }
    });
    await next();
};

module.exports = test;
