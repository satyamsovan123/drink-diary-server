const userActionConstant = {
  PLEASE_TRY_AGAIN_LATER: "Please try again later.",

  SIGN_UP_SUCCESS: "You are now signed up.",
  SIGN_UP_ERROR: "We are unable to sign you up.",

  SIGN_IN_SUCCESS: "You are now signed in.",
  SIGN_IN_ERROR: "We are unable to sign you in.",

  GET_DATA_SUCCESS: "Your data was retrived successfully.",
  GET_DATA_ERROR: "We are unable to retrive your data.",

  ADD_DATA_SUCCESS: "Your data was added successfully.",
  ADD_DATA_ERROR: "We are unable to add your data.",

  UPDATE_DATA_SUCCESS: "Your data was updated successfully.",
  UPDATE_DATA_ERROR: "We are unable to update your data.",

  DELETE_DATA_SUCCESS: "Your data was deleted successfully.",
  DELETE_DATA_ERROR: "We are unable to delete your data.",

  DELETE_ACCOUNT_SUCCESS:
    "While we're sorry to see you leave, your account has been deleted successfully.",
  DELETE_ACCOUNT_ERROR: "We are unable to delete your account",

  SIGN_IN_AGAIN: "We are sorry, but we need you to sign in again.",
  INVALID_CREDENTIALS:
    "We are unable to validate your credentials. Please provide valid credentials.",
  EMAIL_ALREADY_EXISTS:
    "We already have an account with this email. Please sign in.",
  NO_DATA_FOUND: "We are unable to retrive your data. Please add some data.",
  NO_EMAIL_FOUND: "We are unable to retrive your account. Please sign up.",

  PROVIDE_VALID_DATA: "Please provide valid data.",
  REDUNDANT_DATA:
    "Please do not provide redundant data. It hurts the server 😢.",

  DATA_RESET: "Your data would be reset in approximately",

  GENERIC_ERROR: "Something went wrong.",
  VERIFY_DATA_ERROR: "We are unable to validate your data.",

  IS_REQUIRED: "is required.",
  IS_EMPTY: "is empty.",
  IS_INVALID: "is invalid.",
  SHOULD_HAVE: "should have",

  EMAIL: "Email",
  PASSWORD: "Password",
  TOTAL_DRINKS: "Total drinks",
  BEVERAGE_NAME: "Beverage name",
};

module.exports = { userActionConstant };
