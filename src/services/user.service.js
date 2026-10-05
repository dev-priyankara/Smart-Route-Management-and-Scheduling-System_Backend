
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
require("dotenv").config();


// ==========================================
// REGISTER USER
// ==========================================
const registerUser = async (
  full_name,
  email,
  password,
  phone_number = null,
  role = "USER",
  department = null
) => {
  const existingUser = await User.findByEmail(email);

  if (existingUser) {
    const error = new Error("Email already in use");
    error.statusCode = 400;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  const newUser = await User.create(
    full_name,
    email,
    password_hash,
    phone_number,
    role,
    department
  );

  return newUser;
};


// ==========================================
// LOGIN
// ==========================================
const login = async (email, password) => {
  const row = await User.findByEmail(email);

  if (!row) {
    const error = new Error("Invalid email");
    error.statusCode = 400;
    throw error;
  }

  if (row.account_status !== "ACTIVE") {
    const error = new Error("Your account is not active.");
    error.statusCode = 403;
    throw error;
  }

  const validPassword = await bcrypt.compare(
    password,
    row.password_hash
  );

  if (!validPassword) {
    const error = new Error("Invalid password");
    error.statusCode = 400;
    throw error;
  }

  const {
    password_hash: _,
    ...userWithoutPassword
  } = row;

  return userWithoutPassword;
};


// ==========================================
// FIND USER BY EMAIL
// ==========================================
const verifyEmail = async (email) => {
  const row = await User.findByEmail(email);

  if (!row) {
    const error = new Error("Invalid email");
    error.statusCode = 400;
    throw error;
  }

  const otp = await sendOtp(email);

  return {
    email: row.email,
    otp,
  };
};


// ==========================================
// SEND OTP
// ==========================================
const sendOtp = async (email) => {
  if (!email) {
    const error = new Error("Email is required");
    error.statusCode = 400;
    throw error;
  }

  const otp = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  const transporter = require("../../config/transporter");

  const mailOptions = {
    from: `"SRMSS Security" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "SRMSS Password Reset OTP",

    html: `
      <div style="
        font-family: Arial, sans-serif;
        padding: 25px;
        max-width: 500px;
        margin: auto;
        border: 1px solid #ddd;
        border-radius: 10px;
      ">

        <h2 style="color:#b91c1c;">
          SRMSS Security Verification
        </h2>

        <p>
          Use the following verification code to continue
          with your password reset.
        </p>

        <div style="
          background:#f5f5f5;
          padding:20px;
          text-align:center;
          font-size:32px;
          font-weight:bold;
          letter-spacing:8px;
          border-radius:8px;
        ">
          ${otp}
        </div>

        <p style="color:#777;font-size:13px;">
          This code is valid for 5 minutes.
        </p>

        <p style="color:#777;font-size:13px;">
          If you did not request this code, please ignore this email.
        </p>

      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);

    return otp;
  } catch (error) {
    console.error("Email send error:", error);

    const errors = new Error(
      "Failed to send OTP email."
    );

    errors.statusCode = 500;

    throw errors;
  }
};


// ==========================================
// CHANGE PASSWORD BY EMAIL
// ==========================================
const changePasswordByEmail = async (
  email,
  password
) => {
  if (!password || password.length < 8) {
    const error = new Error(
      "Password must contain at least 8 characters."
    );

    error.statusCode = 400;
    throw error;
  }

  const user = await User.findByEmail(email);

  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);

  const password_hash = await bcrypt.hash(
    password,
    salt
  );

  await User.changePasswordByEmail(
    email,
    password_hash
  );
};


// ==========================================
// CHANGE PASSWORD WHILE LOGGED IN
// ==========================================
const changePassword = async (
  id,
  current_password,
  new_password
) => {
  if (!current_password || !new_password) {
    const error = new Error(
      "Current password and new password are required."
    );

    error.statusCode = 400;
    throw error;
  }

  if (new_password.length < 8) {
    const error = new Error(
      "New password must contain at least 8 characters."
    );

    error.statusCode = 400;
    throw error;
  }

  const user = await User.findById(id);

  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }

  const validPassword = await bcrypt.compare(
    current_password,
    user.password_hash
  );

  if (!validPassword) {
    const error = new Error(
      "Current password is incorrect."
    );

    error.statusCode = 400;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);

  const password_hash = await bcrypt.hash(
    new_password,
    salt
  );

  await User.changePasswordById(
    id,
    password_hash
  );
};


// ==========================================
// UPDATE ACCOUNT STATUS
// ==========================================
const updateAccountStatusById = async (
  id,
  account_status
) => {
  const allowedStatuses = [
    "ACTIVE",
    "INACTIVE",
    "SUSPENDED",
  ];

  if (!allowedStatuses.includes(account_status)) {
    const error = new Error(
      "Invalid account status."
    );

    error.statusCode = 400;
    throw error;
  }

  await User.updateAccountStatusById(
    id,
    account_status
  );
};


// ==========================================
// FIND USER BY ID
// ==========================================
const findById = async (id) => {
  const row = await User.findById(id);

  if (!row) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }

  const {
    password_hash: _,
    ...userWithoutPassword
  } = row;

  return userWithoutPassword;
};


// ==========================================
// FIND ALL NORMAL USERS
// ==========================================
const findAll = async () => {
  return await User.findAll();
};


// ==========================================
// FIND ADMIN
// ==========================================
const findAdmin = async () => {
  return await User.findAdmin();
};


// ==========================================
// UPDATE USER PROFILE
// ==========================================
const updateUserById = async (
  id,
  full_name,
  email,
  phone_number,
  department,
  profile_image
) => {
  const user = await User.findById(id);

  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }

  const updatedFullName =
    full_name !== undefined
      ? full_name
      : user.full_name;

  const updatedEmail =
    email !== undefined
      ? email
      : user.email;

  const updatedPhone =
    phone_number !== undefined
      ? phone_number
      : user.phone_number;

  const updatedDepartment =
    department !== undefined
      ? department
      : user.department;

  const updatedImage =
    profile_image || user.profile_image;

  await User.updateUserById(
    id,
    updatedFullName,
    updatedEmail,
    updatedPhone,
    updatedDepartment,
    updatedImage
  );
};


module.exports = {
  registerUser,
  login,
  sendOtp,
  verifyEmail,
  changePasswordByEmail,
  changePassword,
  updateAccountStatusById,
  findById,
  findAll,
  findAdmin,
  updateUserById,
};

