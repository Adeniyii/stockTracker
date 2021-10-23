const { signUpService } = require('../services/AuthService/signup.service');
const { userExists } = require('../services/AuthService/userExists.service');
const { errorResponse, successResponse } = require('../util/response_handler');

exports.signUp = async (req, res, next) => {
  try {
    const duplicateUser = await userExists(
      req.body.email,
      req.body.phone_number,
    );
    if (duplicateUser) {
      return errorResponse(res, 'User already exists', 409);
    }
    const user = await signUpService(req.body);

    // TODO: send email that a new user just signed up

    return successResponse(res, 201, user);
  } catch (error) {
    errorResponse(res, 'Something went wrong', 500);
    return next(error);
  }
};
