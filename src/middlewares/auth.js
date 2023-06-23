module.exports = async (ctx, next) => {
  if (!ctx.session.sessionid) {
    ctx.throw(401, 'You have to Log In');
  }

  try {
    const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
    if (session) {
      await next();
    } else {
      ctx.throw('Invalid Session, please Log In again');
    }
  } catch (error) {
    ctx.throw(error);
  }
};
