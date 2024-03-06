const {
  getApprovalRequest,
  approveTherapist,
} = require("../Controller/AdminController");

const authentication = require("../MiddleWare/Authentication");
const express = require("express");
const aproveRequestRouter = express.Router();

aproveRequestRouter.route("/getAprovalRequest/").get(getApprovalRequest);
aproveRequestRouter
  .route("/approveTherapist/:therapistId")
  .patch(approveTherapist);

module.exports = aproveRequestRouter;
