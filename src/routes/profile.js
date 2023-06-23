// TO DO:
// create users CRUD

const Router = require('koa-router');

const router = new Router();

// const {users} = require('../models');
const bcrypt = require('bcrypt');

router.get('/profile', '/info', async (ctx) => {
  try {
    const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
    const { userid } = session;
    const user = await ctx.orm.users.findByPk(userid);
    let userinfo;
    console.log(user.type);
    if (user.type == 'player') {
      userinfo = await ctx.orm.users.findByPk(
        userid,
        {
          include: [
            { model: ctx.orm.bookings },
          ],
        },
      );
    } else if (user.type == 'owner') {
      userinfo = await ctx.orm.users.findByPk(
        userid,
        {
          include: [
            { model: ctx.orm.enclousures },
          ],
        },
      );
    }
    ctx.body = userinfo;
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});

// Update a player
router.put('/profile', '/update', async (ctx) => {
  try {
    const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
    const { userid } = session;
    const user = await ctx.orm.users.findByPk(userid);
    console.log(user);
    if (!user) {
      ctx.status = 404;
      ctx.body = { error: 'User not found' };
    } else {
      const {
        name, lastname, password, email, type,
      } = ctx.request.body;
      await user.update({
        name,
        lastname,
        password,
        email,
        type,
      });
      ctx.body = user;
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to update user' };
  }
});

// TODO
// Delete a player
router.delete('/profile', '/delete', async (ctx) => {
  try {
    const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
    const { userid } = session;
    console.log(userid);
    const user = await ctx.orm.users.findByPk(userid);
    console.log(user);
    if (!user) {
      ctx.status = 404;
      ctx.body = { error: 'User not found' };
    } else {
      await user.destroy({
        where: {
          id: userid,
        },
      });
      ctx.body = { message: 'User deleted successfully' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to delete User' };
  }
});

module.exports = router;
