const router = require('koa-router')();
const controllers = require('../../controllers');

router.prefix('/api');

router.post('/test', controllers.test.searchUserInformation);

module.exports = router;
