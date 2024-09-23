// const { check, validationResult } = require("express-validator");
// const { error } = require("../models/responsesModels/responseModel");
// const { StatusCodes } = require("http-status-codes");
// const { orderStatus } = require("../models/orderModel");

// const validate = (req, res, next) => {
//   const errors = validationResult(req);
//   if (errors.isEmpty()) {
//     return next();
//   }

//   const errorResponse = {};
//   errors.array().forEach((error) => {
//     const fieldName = error.param;
//     const errorMessage = error.msg;
//     errorResponse[fieldName] = errorMessage;
//   });

//   // logger.error()
//   return error(
//     Object.values(errorResponse)[0],
//     StatusCodes.BAD_REQUEST,
//     res,
//     {}
//   );
//   // return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorResponse });
// };

// const userValidation = [
//   check("email", "Email length should be 3 to 40 characters")
//     .optional({ checkFalsy: true }) // Make email optional
//     .isEmail()
//     .isLength({ min: 3, max: 40 }),
//   check("mobile", "Mobile number should contain 10 or 11 digits")
//     .optional({ checkFalsy: true })
//     .isNumeric()
//     .isLength({ min: 10, max: 11 }),
//   check("gender", "Gender must be entered")
//     .optional({ checkFalsy: true })
//     .isIn(["Male", "Female", "Other"]),
//   check("roleName", "Role Name should be Admin,Support,Sales or SalesHead.")
//     .optional({ checkFalsy: true })
//     .isIn(["Admin", "Support", "Sales","SalesHead"]),
// ];
// const inquiryStatusValidation = [
//   check("email", "Email length should be 3 to 40 characters")
//     .optional({ checkFalsy: true }) // Make email optional
//     .isEmail()
//     .isLength({ min: 3, max: 40 }),
//   check("price", "Price should be in number")
//     .isNumeric()
//     .notEmpty(),
//   check("freight", "Freight should be in number")
//     .isNumeric()
//     .notEmpty(),
//   check("paymentTerms", "PaymentTerms cannot be empty.")
//     .notEmpty(),
// //   check("status", "Enter valid status.")
// //     .optional({ checkFalsy: true })
// //     .isIn(["quotation", orderStatus.ORDER_DONE, orderStatus.ORDER_CANCELED]),
// ];

// module.exports = {userValidation,validate,inquiryStatusValidation};
