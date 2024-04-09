import dbConnection from "../common/db-connection";

const getAllEvents = async () => {
  try {
    const data = await dbConnection.dbConnection.query(`
    SELECT * FROM events`);
    return data;
  } catch (e) {
    return { success: false };
  }
};

export default {
  getAllEvents,
};
