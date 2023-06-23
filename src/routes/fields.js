const Router = require('koa-router');

const router = new Router();

// Get all fields
router.get('/fields', '/', async (ctx) => {
  console.log('aca');
  try {
    const fieldsInfo = await ctx.orm.fields.findAll();
    console.log(fieldsInfo);
    ctx.body = fieldsInfo;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed get fields' };
  }
});

// Create a field
router.post('/fields', '/create', async (ctx) => {
  try {
    // const ownerid = ctx.state.user.id;
    const owner = await ctx.orm.users.findByPk(1);
    console.log(owner);
    ownerid = owner.id;
    const field = await ctx.orm.fields.create({
      number: ctx.request.body.number,
      enclousureid: ctx.request.body.enclousureid,
      maxplayers: ctx.request.body.maxplayers,
      minplayers: ctx.request.body.minplayers,
      playeramount: ctx.request.body.playeramount,
    });
    ctx.body = field;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error };
  }
});

// Get one field
router.get('/fields', '/:id', async (ctx) => {
  try {
    const field = await ctx.orm.fields.findByPk(ctx.params.id);
    if (!field) {
      ctx.status = 404;
      ctx.body = { error: 'field not found' };
    } else {
      ctx.body = field;
    }
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Failed to find field' };
  }
});

// Update
router.put('/fields', '/:id/update', async (ctx) => {
  try {
    const field = await ctx.orm.fields.findByPk(ctx.params.id);
    if (!field) {
      ctx.status = 404;
      ctx.body = { error: 'Field not found' };
    } else {
      const {
        number, enclousureid, maxplayers, minplayers, playeramount,
      } = ctx.request.body;
      await field.update({
        number,
        enclousureid,
        maxplayers,
        minplayers,
        playeramount,
      });
      ctx.body = field;
    }
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Failed to update' };
  }
});

// DETELE
router.delete('/fields', '/:id/delete', async (ctx) => {
  try {
    const field = await ctx.orm.fields.findByPk(ctx.params.id);
    if (!field) {
      ctx.status = 404;
      ctx.body = { error: 'Field not found' };
    } else {
      await field.destroy();
      ctx.body = { message: 'Field deleted' };
    }
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Error' };
  }
});

module.exports = router;
