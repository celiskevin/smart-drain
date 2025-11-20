import express from "express";
import cors from "cors";
import 'dotenv/config';
import userRoutes from "./routes/userRoutes.js";
import sensorRoutes from "./routes/sensorRoutes.js";
import maintenancesRoutes from "./routes/maintenancesRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/sensor-data", sensorRoutes);
app.use("/api/maintenances", maintenancesRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
