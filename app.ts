import express from "express";
import dbConnection from "./common/db-connection";
import cors from "cors";
import estatesRouting from "./routing/estates-routing";
import userRouting from "./routing/user-routing";
import eventRouting from "./routing/event-routing";

const app = express();

dbConnection.dbConnection
  .initialize()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err: any) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use(estatesRouting.esatesRouters);
app.use(userRouting.routingUser);
app.use(eventRouting.eventRouters);

app.listen(3000, "127.0.0.1", () => {
  console.log("Server is listening at port 3000");
});
