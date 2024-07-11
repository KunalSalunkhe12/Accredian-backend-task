import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import referralRoutes from "./routes/referral.route";

const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: [process.env.CLIENT_URL || ""],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Accredian Backend Task" });
});

app.use(referralRoutes);

app.listen(port, () => {
  console.log("Server is running on port", port);
});
