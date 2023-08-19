const { serverConstant, userActionConstant } = require("../constants");

class ResponseBuilder {
  constructor(data, message) {
    this.data = data ?? {};
    this.message =
      message ??
      `${userActionConstant.GENERIC_ERROR} ${userActionConstant.PLEASE_TRY_AGAIN_LATER}`;
  }

  build() {
    let response = {
      data: this.data,
      message: this.message,
    };
    return response;
  }
}

function responseBuilder(data, message) {
  return new ResponseBuilder(data, message).build();
}

module.exports = { responseBuilder };
