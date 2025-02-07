import express , {Request , Response }  from "express"

export const analyticRoutes = express.Router()

analyticRoutes.get("/:alias", (req : Request , res : Response) => {

})

analyticRoutes.get("/topic/:topic", (req : Request , res : Response) => {

})

analyticRoutes.get("/overall", (req : Request , res : Response) => {

})
