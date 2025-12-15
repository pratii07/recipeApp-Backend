import dotenv from "dotenv";
dotenv.config()
import express from "express";
import cors from "cors";
import { dbConnection } from "./database/db.Connection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRoute from "./routes/reservationRoute.js";

const app = express();

app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["POST"],
        credentials: true
    })
)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Health Check route
app.use("/", (req, res) => {
    console.log("API is up and running")
})

//Routes
app.use("/api/v1/reservation", reservationRoute);

dbConnection();

app.use(errorMiddleware)
export default app;