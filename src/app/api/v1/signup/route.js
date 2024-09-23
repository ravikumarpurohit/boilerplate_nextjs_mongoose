import {
  error,
  exception,
  success,
} from "@/models/responsesModels/responseModel";
import { userModel } from "@/models/userModel";
import { dbConnect } from "@/utils/DBConnect";
import { logger } from "@/utils/logger";
const { StatusCodes } = require("http-status-codes");

import { encryptPassword } from "@/utils/passwordCheck";


export async function POST(request) {
  await dbConnect();
  logger.info(`body = ${JSON.stringify(request)}`);
  try {
    const { email, password, fullName, mobile, gender, roleName } =
      await request.json();
    const userExist = await userModel.findOne({ email: email });
    if (userExist) {
      return error("Email already exists", StatusCodes.BAD_REQUEST);
    }

    const encryptedPassword = await encryptPassword(password);

    const data = {
      fullName: fullName,
      email: email,
      password: encryptedPassword,
      mobile: mobile,
      gender: gender,
      // address: req.body.address,
      roleName: roleName,
    };

    const result = await userModel.create(data);

    if (result) {
      //   const emailSender = await mailer(req.body.email, result._id);
      return success("User Created.", data, StatusCodes.CREATED, 5);
    } else {
      return error(
        "Unable to create the User.",
        StatusCodes.INTERNAL_SERVER_ERROR,
        response
      );
    }
  } catch (e) {
    logger.error(`Error while add User | error ${e}`);
    return exception("", StatusCodes.INTERNAL_SERVER_ERROR, e);
  }
}
