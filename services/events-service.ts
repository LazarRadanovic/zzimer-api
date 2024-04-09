import { EventModel } from "../model/Event-model";
import eventRepository from "../repositories/event-repository";

const getAllEvents = async () => {
  const result = await eventRepository.getAllEvents();
  const data: EventModel[] = [];

  result.forEach((element: EventModel) => {
    const eventItem: EventModel = {
      tittle_event: element.tittle_event,
      desc_event: element.desc_event,
      timeOf_event: element.timeOf_event,
      img: element.img,
    };
    data.push(eventItem);
  });
  return data;
};

export default {
  getAllEvents,
};
