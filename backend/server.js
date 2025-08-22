const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

dotenv.config();

const authRoutes = require("./routes/auth");
const purchaseRoutes = require("./routes/purchase");
const transferRoutes = require("./routes/transfer");
const assignmentRoutes = require("./routes/assigments");

const app = express();

// ✅ Allow React frontend (local dev)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api", authRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/logs", require("./routes/logs"));

app.get("/", (req, res) => {
  res.send("Server is running");
});

// ✅ Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("DB connection error:", err));
