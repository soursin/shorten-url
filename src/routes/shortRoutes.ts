import express , {Request , Response }  from "express"

export const shortenRoutes = express.Router()

shortenRoutes.post("/", (req : Request , res : Response) => {

})

shortenRoutes.get("/:alias", (req : Request , res : Response) => {

})
