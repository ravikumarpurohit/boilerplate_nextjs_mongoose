const { logger } = require("@/utils/logger");
const { randomUUID } = require("crypto");

/*
Code:
0 = Error
5 = Success
6 = Logout
*/

/**
 * Success response
 *
 * @param {string} message
 * @param {array} results
 * @param {number} statusCode
 * @param {number} code
 * @returns {Response}
 */
exports.success = (message, results, statusCode, code = 5) => {
  return new Response(
    JSON.stringify({
      data: results,
      error: false,
      message: message,
      code: code,
    }),
    {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    }
  );
};

/**
 * Success response with authentication token
 *
 * @param {string} message
 * @param {string} token
 * @param {array} results
 * @param {number} statusCode
 * @param {number} code
 * @returns {Response}
 */
exports.successAuth = (message, token, results, statusCode, code = 5) => {
  return new Response(
    JSON.stringify({
      data: results,
      token: token,
      error: false,
      message: message,
      code: code,
    }),
    {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    }
  );
};

/**
 * Error response
 *
 * @param {string} message
 * @param {number} statusCode
 * @param {object} err
 * @returns {Response}
 */
exports.error = (message, statusCode, err = {}) => {
  if (err != {}) logger.error(message, err);

  return new Response(
    JSON.stringify({
      error: true,
      message: message,
      code: 0,
    }),
    {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    }
  );
};

/**
 * Exception response
 *
 * @param {string} message
 * @param {number} statusCode
 * @param {object} errorData
 * @returns {Response}
 */
exports.exception = (message, statusCode, errorData) => {
  message = message === "" ? errorData.message : message;
  const uniqueId = randomUUID();
  logger.fatal(uniqueId, errorData);

  return new Response(
    JSON.stringify({
      error: true,
      message: message,
      details: `Please contact support team.\nError-Reference-Id: ${uniqueId}`,
      code: 0,
    }),
    {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    }
  );
};
