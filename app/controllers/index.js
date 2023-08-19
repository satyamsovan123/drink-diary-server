const { signUp } = require("./authentication/signUp");
const { signIn } = require("./authentication/signIn");
const { getDrinkData } = require("./drinkData/getDrinkData");
const { deleteDrinkData } = require("./drinkData/deleteDrinkData");
const { updateDrinkData } = require("./drinkData/updateDrinkData");

const {
  checkExistingUser,
  comparePassword,
  generateJWT,
  encryptPassword,
} = require("./authentication/utils/authenticationHelper");

const {
  checkExistingDrinkData,
} = require("./drinkData/utils/dataManipulationHelper");

module.exports = {
  signUp,
  signIn,
  updateDrinkData,
  deleteDrinkData,
  getDrinkData,
  checkExistingUser,
  comparePassword,
  generateJWT,
  encryptPassword,
  checkExistingDrinkData,
};
