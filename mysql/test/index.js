const SQL = require('../../lib/mysql');

/**
 * 查询用户信息
 * @returns 返回用户信息
 */
const list = async () => {
    return await SQL(
        `SELECT id, name, age, sex, phone FROM test`,
        []
    );
};

module.exports = { list, insert };
