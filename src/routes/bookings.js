const Router = require('koa-router');
const router = new Router();
const { users, bookings, enclousures } = require('../models');

// Get all bookings
router.get('/bookings', '/', async (ctx) => {
  try {
    const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
    const userid = session.userid;
    let fields = []
    const bookingsInfo = await bookings.findAll({
      where: {
        playerid: userid
      }
    });
    console.log(bookingsInfo)
    //ctx.body = bookingsInfo;

    if (!bookingsInfo) {
      ctx.status = 404;
      ctx.body = { error: 'booking not found' };
    }
    else {
      for (const bookingInfo of bookingsInfo) {
        const result = await ctx.orm.enclousures.findAll({
          where: {
            id: bookingInfo.fieldid
          }
        })
        fields.push([result[0], bookingInfo]) 
        //console.log("BOOKING ID",bookingInfo.id)
        //fields.push(bookingInfo.id)
      }

      /*for (const bookingInfo of bookingsInfo) {
        const result = await ctx.orm.availabilities.findAll({
          where: {
            id: bookingInfo.fieldid
          }
        })
        fields.push(result[0]);
      }
      */

      if (!fields) {
        ctx.status = 404;
        ctx.body = { error: 'Field not found' };
      }
      else {
        ctx.body = fields;
      }
    }
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Failed get bookings' };
  }
});


// Create a field
router.post('/bookings', '/create', async (ctx) => {
  try {
    const booking = await bookings.create({
      active: ctx.request.body.active,
      playerid: ctx.request.body.playerid,
      availabilityid: ctx.request.body.availabilityid,
      fieldid: ctx.request.body.fieldid,
    });
    ctx.body = booking;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error };
  }
});

// Get one field
/*router.get('/bookings', '/:id', async (ctx) => {
  try {
    const booking = await bookings.findByPk(ctx.params.id);
    if (!booking) {
      ctx.status = 404;
      ctx.body = { error: 'booking not found' };
    } else {
      ctx.body = booking;
    }
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Failed to find booking' };
  }
});
*/
// Get one field
router.get('/bookings', '/player', async (ctx) => {
  try {
    //const booking = await bookings.findByPk(ctx.params.playerid);
    console.log("VAR0")
    const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
    const userid = session.userid;
    const booking = await bookings.findAll({
      where: {
        playerid: userid
      }
    });
    console.log("VAR1")

    if (!booking) {
      console.log("VAR2")
      ctx.status = 404;
      ctx.body = { error: 'booking not found' };
    }
    else {
      console.log("VAR3")
      const fields = await fields.findAll({
        where: {
          ownerid: booking.fieldid
        }
      })
      console.log("VAR4")
      if (!fields) {
        ctx.status = 404;
        ctx.body = { error: 'Field not found' };
      }
      else {
        console.log("VAR5")
        ctx.body = fields;
      }
    }
  } catch (error) {
    console.log("VAR6")
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Failed to find booking' };
  }
});

// Update 
router.put('/bookings', '/:id/update', async (ctx) => {
  try {
    const field = await bookings.findByPk(ctx.params.id);
    if (!field) {
      ctx.status = 404;
      ctx.body = { error: 'Field not found' };
    } else {
      const { active, playerid, availabilityid, fieldid } = ctx.request.body;
      await field.update({
        active,
        playerid,
        availabilityid,
        fieldid
      });
      ctx.body = field;
    }
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Failed to update' };
  }
});

//DETELE
router.delete('/bookings', '/:id/delete', async (ctx) => {
  try {
    const booking = await bookings.findByPk(ctx.params.id);
    if (!booking) {
      ctx.status = 404;
      ctx.body = { error: 'booking not found' };
    } else {
      await booking.destroy();
      ctx.body = { message: 'booking deleted' };
    }
  } catch (error) {
    console.error(error)
    ctx.status = 500;
    ctx.body = { error: 'Error' };
  }
});

module.exports = router;