const db = require("../../config/db");

class Notification {
  static async create(user_id, title, message) {
    const sql = `
            INSERT INTO notifications
            (user_id, title, message)
            VALUES (?, ?, ?)
        `;

    const [result] = await db.execute(sql, [user_id, title, message]);

    return {
      id: result.insertId,
    };
  }

  static async getByUserId(user_id) {
    const sql = `
            SELECT *
            FROM notifications
            WHERE user_id = ?
            ORDER BY created_at DESC
        `;

    const [rows] = await db.execute(sql, [user_id]);

    return rows;
  }

  static async getUnreadByUserId(user_id) {
    const sql = `
            SELECT *
            FROM notifications
            WHERE user_id = ?
            AND is_read = FALSE
            ORDER BY created_at DESC
        `;

    const [rows] = await db.execute(sql, [user_id]);

    return rows;
  }

  static async markAsRead(id) {
    const sql = `
            UPDATE notifications
            SET is_read = TRUE
            WHERE id = ?
        `;

    const [result] = await db.execute(sql, [id]);

    return result;
  }

  static async markAllAsRead(user_id) {
    const sql = `
            UPDATE notifications
            SET is_read = TRUE
            WHERE user_id = ?
            AND is_read = FALSE
        `;

    const [result] = await db.execute(sql, [user_id]);

    return result;
  }

  static async delete(id) {
    const sql = `
            DELETE FROM notifications
            WHERE id = ?
        `;

    const [result] = await db.execute(sql, [id]);

    return result;
  }
}

module.exports = Notification;
