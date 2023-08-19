const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const {
  statusCodeConstant,
  userActionConstant,
} = require("../../../constants");
const { DrinkData } = require("../../models");

const deleteDrinkData = async (req, res) => {
  try {
    const userData = req.body;

    // DrinkData.collection.dropIndex("expireAt");
    // let temp = await DrinkData.collection.indexes();
    // temp.findIndex((i) => {
    //   console.log(i);
    //   i.name === "expireAt_1";
    // });

    const deletedData = await DrinkData.deleteOne({ email: userData.email });

    logger([`Delete data `, deletedData]);
    if (!deletedData || deletedData?.deletedCount === 0) {
      const generatedResponse = responseBuilder(
        {},
        userActionConstant.NO_DATA_FOUND
      );
      return res.status(statusCodeConstant.NOT_FOUND).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      {},
      userActionConstant.DELETE_DATA_SUCCESS
    );
    return res.status(statusCodeConstant.SUCCESS).send(generatedResponse);
  } catch (error) {
    logger([`Delete data error `, error]);

    const generatedResponse = responseBuilder(
      {},
      userActionConstant.DELETE_DATA_ERROR
    );
    return res.status(statusCodeConstant.ERROR).send(generatedResponse);
  }
};

module.exports = { deleteDrinkData };
