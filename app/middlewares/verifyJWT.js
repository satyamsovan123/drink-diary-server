const {
  responseConstant,
  serverConstant,
  userActionConstant,
  statusCodeConstant,
} = require("../../constants");
const { logger } = require("../../utils");
const { responseBuilder } = require("../../utils/responseBuilder");

const jwt = require("jsonwebtoken");
const {
  checkExistingUser,
} = require("../controllers/authentication/utils/authenticationHelper");

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    const decodedData = jwt.verify(token, appConfig.jwtSecret);
    const existingUser = await checkExistingUser(decodedData?.email);

    // existingUser.email = "user@test.com";
    if (decodedData?.email !== existingUser?.email) {
      const generatedResponse = responseBuilder(
        {},
        userActionConstant.SIGN_IN_AGAIN
      );
      return res
        .status(statusCodeConstant.UNAUTHORIZED)
        .send(generatedResponse);
    }

    req.body["email"] = decodedData?.email;
    // req.body["email"] = "user@test.com";
    next();
  } catch (error) {
    logger(error);

    const generatedResponse = responseBuilder(
      {},
      userActionConstant.SIGN_IN_AGAIN
    );
    return res.status(statusCodeConstant.UNAUTHORIZED).send(generatedResponse);
  }
};

module.exports = { verifyJWT };
