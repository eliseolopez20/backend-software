const Router = require('koa-router');

const router = new Router();
const { enclousures, users } = require('../models');

// Get all enclousures
router.get('/owner', '/enclousures', async (ctx) => {
  try {
    const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
    const { userid } = session;
    const enclousures = await enclousures.findAll({
      where: {
        ownerid: userid,
      },
    });
    console.log(enclousures);
    ctx.body = enclousures;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to retrieve enclousures' };
  }
});

router.post('/owner', '/createenclosure', async (ctx) => {
  try {
    // const ownerid = ctx.state.user.id;
    const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
    const { userid } = session;
    const owner = await users.findByPk(userid); // hardcoded for now
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

// Get a single enclousure by ID
router.get('/owner', '/enclousure/:id', async (ctx) => {
  try {
    const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
    const { userid } = session;
    const enclousure = await enclousures.findByPk(ctx.params.id);
    console.log(enclousure);
    if (!enclousure || userid != enclousure.ownerid) {
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
router.put('/owner', '/enclousure/:id', async (ctx) => {
  try {
    const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
    const { userid } = session;
    const enclousure = await enclousures.findByPk(ctx.params.id);
    console.log(enclousure);
    if (!enclousure || userid != enclousure.ownerid) {
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
router.delete('/owner', '/enclousure/:id', async (ctx) => {
  try {
    const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
    const { userid } = session;
    const enclousure = await enclousures.findByPk(ctx.params.id);
    console.log(enclousure);
    if (!enclousure || userid != enclousure.ownerid) {
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
