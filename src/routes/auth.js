const Router = require('koa-router');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const router = new Router();

router.post('/auth',"/login", async (ctx) => {
    try {
        const user = await ctx.orm.Users.findOne({
            where: { email: ctx.request.body.email },
            //el include no cacho !!!
            /*
            include: [
                { model: ctx.orm.Match, attributes: ['id'], as: 'matchesUser1' }
            ]
            */
        });
        if (user) {
            const compare = await bcrypt.compare(ctx.request.body.password, user.password);
            if (compare) {
                // Creamos la sesión en la base de datos y le agregamos el id a la cookie
                const new_session = await ctx.orm.Sessions.create({
                    userid: user.id
                });
                ctx.session.sessionid = new_session.id;

                // Creamos el jwt
                payload = { matches: user.matchesUser1 }; //!!!
                var token = JWT.sign(payload, `${process.env.JWT_SECRET}`);

                // Lo enviamos
                ctx.response.body = { token: token };

                ctx.status = 201;
            } else {
                ctx.throw(401,"Incorrect Password");
            }
        } else {
            console.log("User not found");
            ctx.throw(404, "User not found");
        }
    } catch (error) {
        console.log(error);
        ctx.throw(error);
    }
});

router.post('users.create', '/signup', async (ctx) => {
    try {
        const hashPassword = await bcrypt.hash(ctx.request.body.password, 5);
        const user = await ctx.orm.User.create({
            name: ctx.request.body.name,
            lastName: ctx.request.body.lastName,
            password: hashPassword,
            email: ctx.request.body.email,
            type: ctx.request.body.type
        });
        ctx.status = 201;
    } catch (error) {
        ctx.throw(error);
    }
});

// Create a user
router.post('/auth', '/create', async (ctx) => {
    try {
        console.log("xdxdxd")
      const hashPassword = await bcrypt.hash(ctx.request.body.password,5);
      const user = await Users.create({
        name: ctx.request.body.name,
        lastName: ctx.request.body.lastName,
        password: hashPassword,
        email: ctx.request.body.email,
        type: ctx.request.body.type
      });
      console.log(user);
      ctx.body = user;
      ctx.status = 201;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Failed to create user' };
    }
  });


router.post('/logout', async (ctx) => {
    try {
        await ctx.orm.Sessions.destroy({
            where: { id: `${ctx.session.sessionid}` }
        });
        ctx.session.sessionid = undefined;
        ctx.status = 200;
    } catch (error) {
        ctx.throw(error);
    }
})

module.exports = router;