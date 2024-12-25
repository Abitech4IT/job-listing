import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRoutes from "./routes";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Enable json body
app.use(express.json());

//Enable the cookieParser
app.use(cookieParser());

// Enable urlencoded body
app.use(express.urlencoded({ extended: true }));

// Handle static files
app.use("/assets", express.static("public/assets"));
app.use("/files", express.static("public/files"));

// Handle routes
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  const response = {
    status: true,
    message: "Welcome to Job listing.... 🤦‍♂️",
    data: {
      service: "job-listing-api",
      version: "1.0.0",
    },
  };

  res.send(`<pre>${JSON.stringify(response, null, 4)}</pre>`);
});

export default app;
