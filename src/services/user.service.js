"use client";

const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = require("../../config/transporter");

const registerUser = async (fname, lname, email, password) => {
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    const error = new Error("Email already in use");
    error.statusCode = 400;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const hash_password = await bcrypt.hash(password, salt);

  const newUser = await User.create(fname, lname, email, hash_password);
  return newUser;
};

const login = async (email, password) => {
  const row = await User.findByEmail(email);

  if (row) {
    const validPassword = await bcrypt.compare(password, row.password_hash);
    if (validPassword) {
      const { password_hash: _, ...userWithoutPassword } = row;
      return userWithoutPassword;
    } else {
      const error = new Error("Invalid password");
      error.statusCode = 400;
      throw error;
    }
  } else {
    const error = new Error("Invalid email");
    error.statusCode = 400;
    throw error;
  }
};

const verifyEmail = async (email) => {
  const row = await User.findByEmail(email);
  if (row) {
    const otp = await sendOtp(email);
    return { email: row.email, otp: otp };
  } else {
    const error = new Error("Invalid email");
    error.statusCode = 400;
    throw error;
  }
};

const sendOtp = async (email) => {
  if (!email) {
    const error = new Error("Email is required");
    error.statusCode = 400;
    throw error;
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const mailOptions = {
    from: `"SkillLink Security" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your One-Time Password (OTP)",
    html: `
      <div style="font-family: sans-serif; padding: 20px; max-width: 500px; border: 1px solid #ddd; border-radius: 5px;">
        <h2>Verification Code</h2>
        <p>Use the following security code to complete your login. This code is valid for 5 minutes.</p>
        <h1 style="background: #f4f4f4; padding: 10px; text-align: center; letter-spacing: 5px; color: #333;">${otp}</h1>
        <p style="font-size: 12px; color: #777;">If you did not request this code, please ignore this email.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return otp;
  } catch (error) {
    console.error("Email send error:", error);
    const errors = new Error("Failed to send OTP email.");
    errors.statusCode = 400;
    throw errors;
  }
};

const changePasswordByEmail = async (email, password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, salt);
    await User.changePasswordByEmail(email, hash_password);
  } catch (error) {
    console.error("Error updating user password:", error.message);
    const errors = new Error(
      "Failed to update user password. Please try again later.",
    );
    errors.statusCode = 400;
    throw errors;
  }
};

const updateAccountStatusById = async (id,account_status) => {
    await User.updateAccountStatusById(id,account_status);

};

const findById = async (id) => {
  const row = await User.findById(id);
  const { password_hash: _, ...userWithoutPassword } = row;
  return userWithoutPassword;
};

const findAll = async () => {
  const result = await User.findAll();
  return result;
};

const updateUserById = async (
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
) => {
  const row = await User.findById(id);

  if (!row) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }
  if (current_password.trim() !== "") {
    const valid = await bcrypt.compare(current_password, row.password_hash);

    if (!valid) {
      const error = new Error("Current password is incorrect ");
      error.statusCode = 404;
      throw error;
    }
  }

  let hash_password = row.password_hash;
  if (new_password && new_password.trim() !== "") {
    const salt = await bcrypt.genSalt(10);
    hash_password = await bcrypt.hash(new_password, salt);
  }

  await User.updateUserById(
    id,
    first_name ? first_name : row.first_name,
    last_name ? last_name : row.last_name,
    email ? email : row.email,
    profile_image ? profile_image : row.profile_image,
    profession ? profession : row.profession,
    headline ? headline : row.headline,
    bio ? bio : row.bio,
    country_code ? country_code : row.country_code,
    phone_number ? phone_number : row.phone_number,
    country ? country : row.country,
    city ? city : row.city,
    latitude ? latitude : row.latitude,
    longitude ? longitude : row.longitude,
    experience_years ? experience_years : row.experience_years,
    average_rating ? average_rating : row.average_rating,
    is_available ? is_available : row.is_available,
    hash_password,
  );
};

const updateUserAverageRating = async (id) => {
  await User.updateUserAverageRating(id);
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
