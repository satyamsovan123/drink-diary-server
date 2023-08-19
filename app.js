const { appConfig } = require("./configs/appConfig");
global.appConfig = appConfig;

const express = require("express");
const cors = require("cors");
const { getServerDetails } = require("./utils/");
const { connectToMongoDB } = require("./configs/connectToMongoDB");
const { serverConstant } = require("./constants/serverConstant");
const app = express();
const routes = require("./app/routes");

app.options("*", cors());

app.use(
  cors({
    origin: [appConfig.webFrontendURL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    exposedHeaders: [serverConstant.AUTHORIZATION_HEADER_KEY],
  })
);

// app.use(express.json());
// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Expose-Headers",
//     serverConstant.AUTHORIZATION_HEADER_KEY
//   );
//   next();
// });
app.use(routes);

connectToMongoDB();

process.on("SIGINT", () => {
  process.exit(0);
});
process.on("SIGTERM", () => {
  process.exit(0);
});
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception: ", error);
  process.exit(1);
});

app.listen(appConfig.port, () => {
  getServerDetails();
});
