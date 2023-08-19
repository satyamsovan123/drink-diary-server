const { appConfig } = require("./configs/appConfig");
global.appConfig = appConfig;

const express = require("express");
const cors = require("cors");
const { getServerDetails } = require("./utils/");
const { connectToMongoDB } = require("./configs/connectToMongoDB");
const { serverConstant } = require("./constants/serverConstant");
const app = express();
const routes = require("./app/routes");

// app.options("*", cors());

const webFrontendURL =
  appConfig.environment === "production"
    ? "https://drink-diary-web.web.app"
    : "http://localhost:4200";
// const webFrontendURL = "http://localhost:4200";

console.log(webFrontendURL);

app.use(
  cors({
    origin: webFrontendURL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    exposedHeaders: [serverConstant.AUTHORIZATION_HEADER_KEY],
  })
);

app.use(express.json());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://drink-diary-web.web.app");
//   next();
// });

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
