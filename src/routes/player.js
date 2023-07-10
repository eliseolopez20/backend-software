const Router = require('koa-router');
const router = new Router();

// Get all bookings
router.get('/player', '/getenclousures', async (ctx) => {
  try {
    const enclosureList = await ctx.orm.enclousures.findAll();
    console.log(enclosureList)
    ctx.body = enclosureList;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Failed to get enclousures' };
  }
});


router.get('/player', '/dates/:id', async (ctx) => {
  console.log("aca");
  const canchaId = ctx.params.cancha_id;
  const enclousure_id = canchaId;


  try {
    ctx
    const Enclousure = await ctx.orm.enclousures.findByPk(enclousure_id);
    //console.log(Enclousure);
    let dates = await ctx.orm.availabilities.findAll({
      where: {
        fieldid: Enclousure.id,
        available: true
      }
    })
    ctx.body = dates;
  }
  catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Failed to get data' };
  }
});

router.get('/player', '/datesinfo/:id/:fecha', async (ctx) => {
  console.log("datesinfo");
  const canchaId = ctx.params.id;
  const fecha = ctx.params.fecha.toString();
  try {
    let new_dictionary = {};
    const Enclousure = await ctx.orm.enclousures.findByPk(canchaId);


    let dates = await ctx.orm.availabilities.findAll({ //dates = availabilities
      where: {
        fieldid: Enclousure.id
      }
    });

    for (const element of dates) {
      if (element.hour === null) {
        continue;
      }

      let hour = element.hour;

      let n = await ctx.orm.bookings.count({ where: { availabilityid: element.id, date: fecha } });

      new_dictionary[hour] = {
        quantity_bookings: n,
        hour: hour,
        date: fecha,
        bool: element.available
      };
    }

    ctx.body = new_dictionary;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Failed to get data' };
  }
});


router.get('/player', '/getavailabilities/:id ', async (ctx) => {
  try {
    const availabilitiesList = await ctx.orm.availabilities.findAll({
      where: {
        fieldid: ctx.params.id
      }
    });
    console.log(availabilitiesList)
    ctx.body = availabilitiesList;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Failed to get availabilities' };
  }
});


router.get('/player', '/getbookings', async (ctx) => {
  try {
    const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
    const userid = session.userid;
    const Bookings = await ctx.orm.bookings.findAll({
      where: {
        playerid: userid
      }
    },);
    console.log(Bookings)
    ctx.body = Bookings;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Failed to get bookings' };
  }
});

// Revisar
// create Booking for player
router.post('/player', '/booking', async (ctx) => {
  try {
    const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
    const userid = session.userid;
    const new_availability = await ctx.orm.availabilities.findOne({
      where: {
        fieldid: ctx.request.body.enclousureid,
        hour: ctx.request.body.hour
      }
    });
    console.log(ctx.request.body.enclousureid)
    const booking = await ctx.orm.bookings.create({
      active: true,
      playerid: userid,
      availabilityid: new_availability.id,
      fieldid: ctx.request.body.enclousureid,
      date: ctx.request.body.date,
      hour: parseInt(ctx.request.body.hour)
    });
    console.log(new_availability.id)
    let availability = await ctx.orm.availabilities.findByPk(new_availability.id);
    await availability.update({
      available: false
    })
    ctx.body = booking;
  } catch (error) {
    console.log(error)
    ctx.status = 500;
    ctx.body = { error };
  }
});

// Get one field
router.get('/player', '/booking/:id', async (ctx) => {
  try {
    const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
    const userid = session.userid;
    const booking = await ctx.orm.bookings.findByPk(ctx.params.id);

    if (!booking) {
      ctx.status = 404;
      ctx.body = { error: 'booking not found' };
    }
    else {
      if (booking.playerid == userid) {
        ctx.body = booking;
        ctx.status = 201;
      }
      else {
        ctx.status = 401;
        ctx.body = { error: 'wrong booking' };
      }
    }
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Failed to find booking' };
  }
});

// Revisar
// Update booking //TODO
router.put('/player', '/booking/:id', async (ctx) => {
  try {
    const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
    const userid = session.userid;
    const booking = await ctx.orm.bookings.findByPk(ctx.params.id);
    if (!booking) {
      ctx.status = 404;
      ctx.body = { error: 'booking not found' };
    }
    else {
      const { active } = ctx.request.body;
      if (booking.playerid == userid) {
        await booking.update({
          active
        });
        ctx.body = booking;
        ctx.status = 201;
      }
      else {
        ctx.status = 401;
        ctx.body = { error: 'wrong booking' };
      }
    }
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Failed to update' };
  }
});

// Revisar
//DETELE
//DETELE
router.delete('/player', '/booking/:id', async (ctx) => {
  try {
    const session = await ctx.orm.sessions.findByPk(ctx.session.sessionid);
    const userid = session.userid;
    const booking = await ctx.orm.bookings.findByPk(ctx.params.id);
    if (!booking) {
      ctx.status = 404;
      ctx.body = { error: 'booking not found' };
    }
    else {
      if (booking.playerid == userid) {
        const availability = await ctx.orm.availabilities.findByPk(booking.availabilityid)
        await availability.update({
          available: true
        })
        await booking.destroy();
        ctx.body = { message: 'booking deleted' };
        ctx.status = 201;
      }
      else {
        ctx.status = 401;
        ctx.body = { error: 'wrong booking' };
      }
    }
  } catch (error) {
    console.error(error)
    ctx.status = 500;
    ctx.body = { error: 'Error' };
  }
});

module.exports = router;