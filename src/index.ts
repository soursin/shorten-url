import * as dotenv from "dotenv"
import express from "express"
import { shortenRoutes } from "./routes/shortRoutes";

dotenv.config()

const app = express();
app.use(express.json());
app.use("/api/shorten",shortenRoutes);


app.listen(process.env.PORT,() => {
    console.log(`Backend Working at port ${process.env.PORT}`)
})