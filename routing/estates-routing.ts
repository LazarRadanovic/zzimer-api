import express from "express";
import estateController from "../controllers/estate-controller";

const esatesRouters = express.Router();

esatesRouters.route("/estates").get(estateController.getAllEstates);

esatesRouters.route("/estates/:id").get(estateController.getEstateById);
esatesRouters.route("/towns").get(estateController.getAllTowns);

esatesRouters
  .route("/estates/location/:town")
  .get(estateController.getEstateByLocation);

esatesRouters
  .route("/count-likes/:id")
  .get(estateController.countLikesByEstateId);

esatesRouters.route("/delete-esate/:id").delete(estateController.deleteEstate);

export default { esatesRouters };
