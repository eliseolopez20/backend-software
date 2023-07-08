const Router = require('koa-router');
const router = new Router();
const { availabilities, users, fields } = require('../models');

// Get all fields
router.get('/availabilities', '/', async (ctx) => {
    try {
      const availabilitiesInfo = await availabilities.findAll();
      ctx.body = availabilitiesInfo;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Failed get availabilities' };
    }
  });


// Create availabilities
router.post('/availabilities', '/', async (ctx) => {
    try {
      const session = await ctx.orm.sessions.findByPk(ctx.headers.authorization);
      const userid = 152;
      console.log(userid)
      
      const { fieldid, date, hourstart, minutestart, minutelength, slotsamount} = ctx.request.body;
      console.log(fieldid, date, hourstart, minutestart, minutelength, slotsamount)
      for (let i = 0; i < slotsamount; i++) {
        console.log("in")
        let hour = hourstart;
        let minute = minutestart + minutelength*i;
        console.log("in 2")
        console.log(minute > 59)
        console.log(minute);
        while(minute > 59){
          console.log("in 3")
          minute-=60;
          hour+=1;
        }
        console.log(hour);
        console.log(minute);
        console.log("Creando horario partiendo en "+ date + " " + hour+":"+minute);
        // const availbility = await availabilities.create({
        //   fieldid: fieldid,
        //   timestart: time,
        //   timeend: time + minutelength,
        //   available: true,
        // });
      }
      //ctx.body = availbility;
    } catch (error) {
      console.error(error);
      ctx.status = 500;
      ctx.body = { error };
    }
  });

  // Get one field
router.get('/availabilities', '/:id', async (ctx) => {
    try {
      const availability = await ctx.orm.availabilities.findAll({
        where: {
            fieldid: ctx.params.id
        }
      });
      if (!availability) {
        ctx.status = 404;
        ctx.body = { error: 'availability not found' };
      } else {
        ctx.body = availability;
      }
    } catch (error) {
        console.error(error);
      ctx.status = 500;
      ctx.body = { error: 'Failed to find availability' };
    }
  });

  // Update 
router.put('/availabilities', '/:id/update',  async (ctx) => {
    try {
      const updated_availabilty = await availabilities.findByPk(ctx.params.id);
      if (!updated_availabilty) {
        ctx.status = 404;
        ctx.body = { error: 'Availability not found' };
      } else {
        const { fieldid, timestart, timeend, available} = ctx.request.body;
        await updated_availabilty.update({
            fieldid,
            timestart,
            timeend,
            available
        });
        ctx.body = updated_availabilty;
      }
    } catch (error) {
        console.error(error);
      ctx.status = 500;
      ctx.body = { error: 'Failed to update' };
    }
  });

//DETELE
router.delete('/availabilities', '/:id/delete', async (ctx) => {
    try {
      const availability = await availabilities.findByPk(ctx.params.id);
      if (!availability) {
        ctx.status = 404;
        ctx.body = { error: 'availability not found' };
      } else {
        await availability.destroy();
        ctx.body = { message: 'availability deleted' };
      }
    } catch (error) {
     console.error(error)
      ctx.status = 500;
      ctx.body = { error: 'Error' };
    }
  });

module.exports = router;