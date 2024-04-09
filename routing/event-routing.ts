import express from "express";
import eventController from "../controllers/event-controller";

const eventRouters = express.Router();

eventRouters.route("/events").get(eventController.getAllEvents);

export default {
  eventRouters,
};
