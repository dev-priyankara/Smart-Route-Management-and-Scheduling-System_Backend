const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res, next) => {
  try {
    const { fname, lname, email, password } = req.body;
    const result = await userService.registerUser(
      fname,
      lname,
      email,
      password,
    );
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await userService.login(email, password);
    const token = jwt.sign(
      {
        id: result.id,
        email: result.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.status(200).json({
      success: true,
      data: {
        user: {
          ...result,
          profile_image: result.profile_image
            ? result.profile_image.toString("base64")
            : null,
        },
        token: token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await userService.verifyEmail(email);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await userService.sendOtp(email);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const changePasswordByEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await userService.updateUserByEmail(email, password);
    res.status(200).json({
      success: true,
      message: "Password updated successfully. Redirecting to login...",
    });
  } catch (error) {
    next(error);
  }
};

const updateAccountStatusById = async (req, res, next) => {
  try {
    const { id,account_status } = req.body;
    await userService.updateAccountStatusById(id,account_status);
    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await userService.findById(id);
    res.status(200).json({
      success: true,
      data: {
        ...result,
        profile_image: result.profile_image
          ? result.profile_image.toString("base64")
          : null,
      },
    });
  } catch (error) {
    next(error);
  }
};

const findAll = async (_, res, next) => {
  try {
    const result = await userService.findAll();

    const users = result.map((user) => ({
      ...user,
      profile_image: user.profile_image
        ? Buffer.from(user.profile_image).toString("base64")
        : null,
    }));

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const {
      id,
      first_name,
      last_name,
      email,
      profession,
      headline,
      bio,
      country_code,
      phone_number,
      country,
      city,
      latitude,
      longitude,
      experience_years,
      average_rating,
      is_available,
      current_password,
      new_password,
    } = req.body;

    const profile_image = req.file ? req.file.buffer : null;

    await userService.updateUserById(
      id,
      first_name,
      last_name,
      email,
      profile_image,
      profession,
      headline,
      bio,
      country_code,
      phone_number,
      country,
      city,
      latitude,
      longitude,
      experience_years,
      average_rating,
      is_available,
      current_password,
      new_password,
    );
    res
      .status(200)
      .json({ success: true, message: "Profile updated successfully." });
  } catch (error) {
    next(error);
  }
};

const updateUserAverageRating = async (req, res, next) => {
  try {
    const { id } = req.body;
    await userService.updateUserAverageRating(id);
    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  login,
  sendOtp,
  verifyEmail,
  changePasswordByEmail,updateAccountStatusById,
  findById,
  findAll,
  updateUserById,
  updateUserAverageRating,
};
