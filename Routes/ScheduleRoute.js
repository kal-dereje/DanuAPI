const {
  createSchedule,
  // getReview,
  // getOneReview,
  // deleteReview,
  // updateReview,
} = require("../Controller/ScheduleController");

const authentication = require("../MiddleWare/Authentication");
const express = require("express");
const scheduleRouter = express.Router();

// schedule.use(authentication);
scheduleRouter.route("/createschedule").post(createSchedule);
//   scheduleRouter.route("/getschedules").get(getschedule);
//   scheduleRouter.route("/getOneschedule/:id").get(getOneschedule);
//   scheduleRouter.route("/updateschedule/:id").patch(updateschedule);
//   scheduleRouter.route("/deleteschedule/:id").delete(deleteschedule);

module.exports = scheduleRouter;
