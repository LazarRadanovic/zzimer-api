import { Request, Response } from "express";
import eventsService from "../services/events-service";

const getAllEvents = async (req: Request, res: Response) => {
  res.send(await eventsService.getAllEvents());
};
const insertNewEvent = async (req: Request, res: Response) => {
  res.send(await eventsService.insertNewEvent(req.body));
};
export default {
  getAllEvents,
  insertNewEvent,
};
