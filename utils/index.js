const { STATUS_CODES } = require('http');

class HttpError extends Error {
  constructor(status) {
    super(STATUS_CODES[status]);
    this.name = this.constructor.name;
    this.status = status;
  }
}

module.exports = {
  HttpError
}