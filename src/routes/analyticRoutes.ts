import express , {Request , Response }  from "express"
import {alias , topic , overall} from "../controllers/analyticController"
export const analyticRoutes = express.Router()

analyticRoutes.get("/:alias", alias)

analyticRoutes.get("/topic/:topic",topic)

analyticRoutes.get("/overall", overall)
