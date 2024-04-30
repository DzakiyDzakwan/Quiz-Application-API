import { readFile, writeFile } from "fs/promises";
import moment from "moment";

const logFile = "./storage/server.log";

const logger = async (req, res, next) => {
  const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
  const method = req.method;
  const url = req.originalUrl;
  const userAgent = req.headers["user-agent"];

  const logMessage = `[REQUEST] ${timestamp} | ${method} | ${url} | ${userAgent}`;

  try {
    await writeFile(logFile, `${logMessage}\n`, { flag: "a" });
  } catch (error) {
    const errorMessage = `[ERROR]${timestamp} | ${method} | ${url} | ${userAgent} | ${error.message}`;
    console.error("Gagal menulis log:", error);
  }

  next();
};

export default logger;
