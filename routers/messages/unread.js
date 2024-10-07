const Router = require('koa-router');
const { faker } = require('@faker-js/faker');

const router = new Router();

router.get('/messages', async (ctx) => {
    let messages = [];
      messages.push({
        id: faker.string.uuid(),
        from: faker.internet.userName(),
        subject: faker.internet.password(),
        body: faker.date.birthdate(),
        received: Math.floor(faker.date.recent().getTime() / 1000), // Время в секундах
        userId: faker.date.past(),
      });
    let data = {
        status:'ok',
        //timestamp: new date(),
        messages
    }
  ctx.response.body = JSON.stringify(data);
});

module.exports = router;