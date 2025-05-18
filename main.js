import express from "express";
import cors from "cors";
import "dotenv/config";

import chatRoutes from "./routes/chat.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/chat", chatRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});