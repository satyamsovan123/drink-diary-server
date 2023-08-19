const {
  responseConstant,
  serverConstant,
  userActionConstant,
  statusCodeConstant,
} = require("../../constants");
const { logger } = require("../../utils");
const { responseBuilder } = require("../../utils/responseBuilder");
const {
  checkExistingDrinkData,
} = require("../controllers/drinkData/utils/dataManipulationHelper");
const { DrinkDataRequestValidator } = require("../models");

const verifyDrinkDataRequest = async (req, res, next) => {
  try {
    const userData = req.body;

    const { dataIsInvalid, feedbackMessage } =
      await new DrinkDataRequestValidator(userData).getValidationResult();

    if (dataIsInvalid) {
      const generatedResponse = responseBuilder({}, feedbackMessage);
      return res.status(statusCodeConstant.INVALID).send(generatedResponse);
    }

    next();
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      serverConstant.ERROR_OCCURRED_WHILE_VERIFYING
    );
    return res.status(statusCodeConstant.ERROR).send(generatedResponse);
  }
};

module.exports = { verifyDrinkDataRequest };
