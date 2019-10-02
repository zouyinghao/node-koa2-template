// 引入用户表 SQL语句
const controllers = require('../../mysql/test');

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
    let status = true;
    await controllers.list().then(async result => {
        for (let item of result){
            if (item.phone === ctx.request.body.phone){
                status = false;
                ctx.message = '该手机号码已经被注册！';
                ctx.result = null;
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
            ctx.message = '创建用户失败！';
            ctx.result = null;
        }
    });
    await next();
};

module.exports = test;
