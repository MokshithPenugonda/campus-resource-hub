import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authroutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import { connectDb } from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDb();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/resource", resourceRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
