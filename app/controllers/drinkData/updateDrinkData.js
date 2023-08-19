const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const {
  statusCodeConstant,
  userActionConstant,
} = require("../../../constants");
const { DrinkData } = require("../../models");
const { checkExistingDrinkData } = require("./utils/dataManipulationHelper");

const updateDrinkData = async (req, res) => {
  try {
    const userData = req.body;

    const drinkData = {
      email: userData.email,
      totalDrinks: userData.totalDrinks,
      beverageName:
        userData.beverageName.charAt(0).toUpperCase() +
        userData.beverageName.slice(1).toLowerCase(),
    };

    const existingDrinkData = await checkExistingDrinkData(userData.email);
    logger([`Update data `, existingDrinkData]);

    if (!existingDrinkData || existingDrinkData.length === 0) {
      await new DrinkData(drinkData).save();

      const generatedResponse = responseBuilder(
        {},
        userActionConstant.ADD_DATA_SUCCESS
      );
      return res.status(statusCodeConstant.SUCCESS).send(generatedResponse);
    }

    await DrinkData.findOneAndUpdate({ email: userData.email }, drinkData);

    const generatedResponse = responseBuilder(
      {},
      userActionConstant.UPDATE_DATA_SUCCESS
    );

    return res.status(statusCodeConstant.SUCCESS).send(generatedResponse);
  } catch (error) {
    logger([`Update data error `, error]);

    const generatedResponse = responseBuilder(
      {},
      userActionConstant.UPDATE_DATA_ERROR
    );
    return res.status(statusCodeConstant.ERROR).send(generatedResponse);
  }
};

module.exports = { updateDrinkData };
