module.exports = async (ctx, next) => {
  try {
    const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
    const { userid } = session;
    const user = await ctx.orm.users.findByPk(userid);
    console.log(user.type);
    console.log(user.type != 'admin');
    if (user.type != 'admin') {
      ctx.throw(403, 'Access Denied');
    }
  } catch (error) {
    ctx.throw(error);
  }
};
