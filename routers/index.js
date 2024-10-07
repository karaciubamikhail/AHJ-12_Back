const combineRouters = require('koa-combine-routers');

const index = require('./messages/unread.js');

const router = combineRouters(
  index,
);

module.exports = router;