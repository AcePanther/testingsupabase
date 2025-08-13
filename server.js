import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "./routes/users.js";

dotenv.config();

const app = express();
app.use(cors()); // allow all origins for now; tighten later for production
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok", ts: new Date().toISOString() }));
app.use("/users", usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
