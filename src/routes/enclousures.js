const Router = require('koa-router');

const router = new Router();
const { enclousures, users } = require('../models');

// Create an enclousure
router.post('/enclousures', '/create', async (ctx) => {
  try {
    // const ownerid = ctx.state.user.id;
    const owner = await users.findByPk(1); // hardcoded for now
    console.log(owner);
    ownerid = owner.id;
    const enclousure = await enclousures.create({
      name: ctx.request.body.name,
      ownerid,
      address: ctx.request.body.address,
      district: ctx.request.body.district,
      phonenumber: ctx.request.body.phonenumber,
      socialmedia: ctx.request.body.socialmedia,
      email: ctx.request.body.email,
    });
    console.log(enclousure);
    ctx.body = enclousure;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to create enclousure' };
  }
});

// Get all enclousures
router.get('/enclousures', '/', async (ctx) => {
  try {
    const enclousuresInfo = await enclousures.findAll();
    console.log(enclousuresInfo);
    ctx.body = enclousuresInfo;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to retrieve enclousures' };
  }
});

// Get a single enclousure by ID
router.get('/enclousures', '/:id', async (ctx) => {
  try {
    const enclousure = await enclousures.findByPk(ctx.params.id);
    console.log(enclousure);
    if (!enclousure) {
      ctx.status = 404;
      ctx.body = { error: 'Enclousure not found' };
    } else {
      ctx.body = enclousure;
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to retrieve enclousure' };
  }
});

// Update an enclousure
router.put('/enclousures', '/:id/update', async (ctx) => {
  try {
    const enclousure = await enclousures.findByPk(ctx.params.id);
    console.log(enclousure);
    if (!enclousure) {
      ctx.status = 404;
      ctx.body = { error: 'Enclousure not found' };
    } else {
      const {
        name, address, district, phonenumber, socialmedia, email,
      } = ctx.request.body;
      await enclousure.update({
        name,
        address,
        district,
        phonenumber,
        socialmedia,
        email,
      });
      ctx.body = enclousure;
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to update enclousure' };
  }
});

// Delete an enclousure
router.delete('/enclousures', '/:id/delete', async (ctx) => {
  try {
    const enclousure = await enclousures.findByPk(ctx.params.id);
    console.log(enclousure);
    if (!enclousure) {
      ctx.status = 404;
      ctx.body = { error: 'Enclousure not found' };
    } else {
      await enclousure.destroy();
      ctx.body = { message: 'Enclousure deleted successfully' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to delete enclousure' };
  }
});

module.exports = router;
