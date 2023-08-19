const { logger } = require("../../../../utils");
const { DrinkData } = require("../../../models");
const bcrypt = require("bcrypt");
const saltRounds = Number(appConfig.saltRounds);
const jwt = require("jsonwebtoken");

const checkExistingDrinkData = async (email) => {
  let cursorData = null;

  if (!email) {
    return cursorData;
  }
  await DrinkData.findOne({ email: email })
    .select("email beverageName totalDrinks -_id")
    .then((result) => {
      cursorData = result;
    })
    .catch((error) => {
      logger(error);
      cursorData = null;
    });
  return cursorData;
};

module.exports = {
  checkExistingDrinkData,
};
