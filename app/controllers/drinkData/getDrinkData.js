const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const {
  statusCodeConstant,
  userActionConstant,
} = require("../../../constants");
const { checkExistingDrinkData } = require("./utils/dataManipulationHelper");

const getDrinkData = async (req, res) => {
  try {
    const userData = req.body;
    const data = await checkExistingDrinkData(userData.email);
    logger([`Get data `, data]);

    if (!data || data.length === 0) {
      const generatedResponse = responseBuilder(
        {},
        userActionConstant.NO_DATA_FOUND
      );
      return res.status(statusCodeConstant.NOT_FOUND).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      data,
      `${userActionConstant.GET_DATA_SUCCESS}`
    );

    return res.status(statusCodeConstant.SUCCESS).send(generatedResponse);
  } catch (error) {
    logger([`Get data error `, error]);

    const generatedResponse = responseBuilder(
      {},
      userActionConstant.GET_DATA_ERROR
    );
    return res.status(statusCodeConstant.ERROR).send(generatedResponse);
  }
};

module.exports = { getDrinkData };
