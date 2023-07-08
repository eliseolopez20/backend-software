const Router = require('koa-router');
const router = new Router();
const {  users, bookings } = require('../models');

// Get all bookings
router.get('/bookings', '/', async (ctx) => {
    console.log("aca");
    try {
      const bookingsInfo = await bookings.findAll();
      console.log(bookingsInfo)
      ctx.body = bookingsInfo;
    } catch (error) {
        console.error(error);
      ctx.status = 500;
      ctx.body = { error: 'Failed get bookings' };
    }
  });


// Create a field
router.post('/bookings', '/create', async (ctx) => {
  console.log(ctx.request.body);
    try {
      const booking = await bookings.create({
        active: ctx.request.body.active,
        availabilityid: ctx.request.body.availabilityid,
        date: ctx.request.body.date,
        playerid: ctx.request.body.playerid,
        fieldid: ctx.request.body.fieldid
        
      });
      ctx.body = booking;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error };
    }
  });

  // Get one field
router.get('/bookings', '/:id', async (ctx) => {
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

  // Update 
router.put('/bookings', '/:id/update',  async (ctx) => {
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
        console.log("updating booking");
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