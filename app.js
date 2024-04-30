import express from "express";
import routes from "./routes/route.js";
import dotenv from "dotenv";
import logger from "./app/middlewares/LoggerMiddleware.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);
app.use("/api/v1/", routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
