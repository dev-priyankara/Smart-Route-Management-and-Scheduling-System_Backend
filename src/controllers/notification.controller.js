const NotificationService = require("../services/notification.service");

const create = async (req, res, next) => {
  try {
    const { user_id, email, title, message } = req.body;

    const result = await NotificationService.createNotification(
      user_id,
      email,
      title,
      message,
    );

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getByUserId = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    const notifications = await NotificationService.getByUserId(user_id);

    return res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};

const getUnread = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    const notifications = await NotificationService.getUnreadByUserId(user_id);

    return res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};

const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;

    await NotificationService.markAsRead(id);

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const markAllAsRead = async (req, res, next) => {
  try {
    const { user_id } = req.body;

    await NotificationService.markAllAsRead(user_id);

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    await NotificationService.delete(id);

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getByUserId,
  getUnread,
  markAsRead,
  markAllAsRead,
  deleteById,
};
