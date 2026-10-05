const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// ==============================
// REGISTER USER
// ==============================
const registerUser = async (req, res, next) => {
  try {
    const {
      full_name,
      email,
      password,
      phone_number,
      role,
      department,
    } = req.body;

    const result = await userService.registerUser(
      full_name,
      email,
      password,
      phone_number,
      role,
      department
    );

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


// ==============================
// LOGIN
// ==============================
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await userService.login(email, password);

    const token = jwt.sign(
      {
        id: result.id,
        email: result.email,
        role: result.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      success: true,
      data: {
        user: {
          ...result,
          profile_image: result.profile_image
            ? Buffer.from(result.profile_image).toString("base64")
            : null,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};


// ==============================
// GET USER BY ID
// ==============================
const findById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await userService.findById(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        ...result,
        profile_image: result.profile_image
          ? Buffer.from(result.profile_image).toString("base64")
          : null,
      },
    });
  } catch (error) {
    next(error);
  }
};


// ==============================
// GET ALL USERS
// ==============================
const findAll = async (req, res, next) => {
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


// ==============================
// UPDATE ADMIN / USER PROFILE
// ==============================
const updateUserById = async (req, res, next) => {
  try {
    const {
      id,
      full_name,
      email,
      phone_number,
      department,
    } = req.body;

    const profile_image = req.file
      ? req.file.buffer
      : null;

    await userService.updateUserById(
      id,
      full_name,
      email,
      phone_number,
      department,
      profile_image
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};


// ==============================
// CHANGE PASSWORD
// ==============================
const changePassword = async (req, res, next) => {
  try {
    const {
      id,
      current_password,
      new_password,
    } = req.body;

    if (!id || !current_password || !new_password) {
      return res.status(400).json({
        success: false,
        message: "User ID, current password and new password are required.",
      });
    }

    if (new_password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "New password must contain at least 8 characters.",
      });
    }

    await userService.changePassword(
      id,
      current_password,
      new_password
    );

    res.status(200).json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};


// ==============================
// CHANGE PASSWORD BY EMAIL
// ==============================
const changePasswordByEmail = async (req, res, next) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 8 characters.",
      });
    }

    await userService.updateUserByEmail(
      email,
      password
    );

    res.status(200).json({
      success: true,
      message: "Password updated successfully. Redirecting to login...",
    });
  } catch (error) {
    next(error);
  }
};


// ==============================
// UPDATE ACCOUNT STATUS
// ==============================
const updateAccountStatusById = async (req, res, next) => {
  try {
    const {
      id,
      account_status,
    } = req.body;

    const allowedStatuses = [
      "ACTIVE",
      "INACTIVE",
      "SUSPENDED",
    ];

    if (!allowedStatuses.includes(account_status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid account status.",
      });
    }

    await userService.updateAccountStatusById(
      id,
      account_status
    );

    res.status(200).json({
      success: true,
      message: "Account status updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};


// ==============================
// VERIFY EMAIL
// ==============================
const verifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const result = await userService.verifyEmail(email);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


// ==============================
// SEND OTP
// ==============================
const sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    const result = await userService.sendOtp(email);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};




module.exports = {
  registerUser,
  login,
  findById,
  findAll,
  updateUserById,
  changePassword,
  changePasswordByEmail,
  updateAccountStatusById,
  verifyEmail,
  sendOtp,
};