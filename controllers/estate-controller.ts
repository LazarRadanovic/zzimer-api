import { Request, Response } from "express";
import estateService from "../services/estate-service";

const getAllEstates = async (req: Request, res: Response) => {
  const data = await estateService.getAllEstates();
  res.send(data);
};

const getEstateById = async (req: Request, res: Response) => {
  res.send(await estateService.getEstateById(parseInt(req.params["id"])));
};
const getEstateByLocation = async (req: Request, res: Response) => {
  res.send(await estateService.getEstateByLocation(req.params["town"]));
};

const getAllTowns = async (req: Request, res: Response) => {
  res.send(await estateService.getAllTowns());
};
export default {
  getAllEstates,
  getEstateById,
  getEstateByLocation,
  getAllTowns,
};
