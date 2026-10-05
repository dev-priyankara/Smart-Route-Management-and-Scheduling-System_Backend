"use client";

const Notification = require("../models/notification.model");
const User = require("../models/user.model");
const transporter = require("../../config/transporter");

const createNotification = async (user_id, email, title, message) => {
  if (!user_id) {
    const admins = await User.findAdmin();
    user_id = admins[0].id;
    email = admins[0].email;
  }

  const mailOptions = {
    from: `"SkillLink" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: title,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 500px; margin: auto; border: 1px solid #ddd; border-radius: 10px; background-color: #ffffff;">
        <h2 style="color: #2563eb; margin-bottom: 20px;">SkillLink Notification</h2>
        <h3 style="color: #333;">${title}</h3>
        <p style="color: #555; font-size: 15px; line-height: 1.6;">${message}</p>
        <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #888;">
          <p> This is an automated notification from SkillLink.</p>
          <p> Please do not reply to this email.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);

  const newNotification = await Notification.create(user_id, title, message);
  return newNotification;
};

const getByUserId = async (user_id) => {
  const row = await Notification.getByUserId(user_id);
  return row;
};

const getUnreadByUserId = async (user_id) => {
  const rows = await Notification.getUnreadByUserId(user_id);
  return rows;
};

const markAsRead = async (id) => {
  await Notification.markAsRead(id);
};

const markAllAsRead = async (user_id) => {
  await Notification.markAllAsRead(user_id);
};

const deleteById = async (id) => {
  await Notification.delete(id);
};

module.exports = {
  createNotification,
  getByUserId,
  getUnreadByUserId,
  markAsRead,
  markAllAsRead,
  deleteById,
};
