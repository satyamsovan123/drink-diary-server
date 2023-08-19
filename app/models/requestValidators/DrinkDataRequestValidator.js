const Joi = require("joi");
const { userActionConstant } = require("../../../constants");
const { logger } = require("../../../utils");

class DrinkDataRequestValidator {
  constructor(data = {}) {
    this.data = data;
    this.validatorSchema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: {} })
        .min(4)
        .required()
        .messages({
          "string.empty": `${userActionConstant.EMAIL} ${userActionConstant.IS_EMPTY} ${userActionConstant.PROVIDE_VALID_DATA}`,
          "string.email": `${userActionConstant.EMAIL} ${userActionConstant.IS_INVALID} ${userActionConstant.PROVIDE_VALID_DATA}`,
          "string.min": `${userActionConstant.EMAIL} ${userActionConstant.SHOULD_HAVE} at least {#limit} characters.  ${userActionConstant.PROVIDE_VALID_DATA}`,
          "any.required": `${userActionConstant.EMAIL} ${userActionConstant.IS_REQUIRED} ${userActionConstant.PROVIDE_VALID_DATA}`,
        }),
      beverageName: Joi.string()
        .required()
        .min(3)
        .messages({
          "string.min": `${userActionConstant.BEVERAGE_NAME} ${userActionConstant.SHOULD_HAVE} at least {#limit} characters. ${userActionConstant.PROVIDE_VALID_DATA}`,
          "string.empty": `${userActionConstant.BEVERAGE_NAME} ${userActionConstant.IS_EMPTY} ${userActionConstant.PROVIDE_VALID_DATA}`,
          "any.required": `${userActionConstant.BEVERAGE_NAME} ${userActionConstant.IS_REQUIRED} ${userActionConstant.PROVIDE_VALID_DATA}`,
        }),
      totalDrinks: Joi.number()
        .integer()
        .positive()
        .greater(0)
        .required()
        .messages({
          "number.positive": `${userActionConstant.TOTAL_DRINKS} ${userActionConstant.IS_INVALID} Only whole numbers greater than 0 are acceptable. ${userActionConstant.PROVIDE_VALID_DATA}`,
          "number.integer": `${userActionConstant.TOTAL_DRINKS} ${userActionConstant.IS_INVALID} Only whole numbers greater than 0 are acceptable. ${userActionConstant.PROVIDE_VALID_DATA}`,
          "number.min": `${userActionConstant.TOTAL_DRINKS} ${userActionConstant.IS_INVALID} Only whole numbers greater than 0 are acceptable. ${userActionConstant.PROVIDE_VALID_DATA}`,
          "number.base": `${userActionConstant.TOTAL_DRINKS} ${userActionConstant.IS_INVALID} Only whole numbers greater than 0 are acceptable. ${userActionConstant.PROVIDE_VALID_DATA}`,
          "any.required": `${userActionConstant.TOTAL_DRINKS} ${userActionConstant.IS_REQUIRED} ${userActionConstant.PROVIDE_VALID_DATA}`,
        }),
    }).messages({
      "object.unknown": `${userActionConstant.REDUNDANT_DATA}`,
    });
    this.validationResult = this.validatorSchema.validateAsync(data);
  }

  async getValidationResult() {
    let dataIsInvalid = false;
    let feedbackMessage = "";
    try {
      await this.validationResult;
      return { dataIsInvalid, feedbackMessage };
    } catch (error) {
      logger(error);
      dataIsInvalid = true;
      feedbackMessage = error?.message ?? userActionConstant.VERIFY_DATA_ERROR;
      return { dataIsInvalid, feedbackMessage };
    }
  }
}

module.exports = { DrinkDataRequestValidator };
