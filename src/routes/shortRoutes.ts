import {  Router }  from "express"
import  {longToShort , shortToLong}  from "../controllers/shortController"

export const shortenRoutes = Router();

shortenRoutes.post("/", longToShort);
shortenRoutes.get("/:alias" ,shortToLong);
