import dbConnection from "../common/db-connection";
import { EventModel } from "../model/Event-model";

const getAllEvents = async () => {
  try {
    const data = await dbConnection.dbConnection.query(`
    SELECT * FROM events`);
    return data;
  } catch (e) {
    return { success: false };
  }
};
const insertNewEvent = async (event: EventModel) => {
  try {
    console.log(event.tittle_event);

    const result = await dbConnection.dbConnection.query(
      `INSERT INTO events(tittle_event,desc_event,timeOf_event,img,id) VALUES(?,?,?,?,DEFAULT)`,
      [event.tittle_event, event.desc_event, event.timeOf_event, event.img]
    );

    if (result.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  } catch (e: any) {
    return { success: false, msg: e.message };
  }
};

export default {
  getAllEvents,
  insertNewEvent,
};
