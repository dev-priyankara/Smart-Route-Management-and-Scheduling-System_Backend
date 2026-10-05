
const db = require("../../config/db");

class User {

  // ==========================================
  // CREATE USER
  // ==========================================
  static async create(
    full_name,
    email,
    password_hash,
    phone_number,
    role,
    department
  ) {
    const sql = `
      INSERT INTO users
      (
        full_name,
        email,
        password_hash,
        phone_number,
        role,
        department
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      full_name,
      email,
      password_hash,
      phone_number,
      role,
      department,
    ]);

    return {
      id: result.insertId,
    };
  }


  // ==========================================
  // FIND ADMIN
  // ==========================================
  static async findAdmin() {
    const sql = `
      SELECT
        id,
        full_name,
        email,
        phone_number,
        role,
        department,
        account_status
      FROM users
      WHERE role = 'ADMINISTRATOR'
      LIMIT 1
    `;

    const [rows] = await db.execute(sql);

    return rows[0];
  }


  // ==========================================
  // FIND BY EMAIL
  // ==========================================
  static async findByEmail(email) {
    const sql = `
      SELECT *
      FROM users
      WHERE email = ?
      LIMIT 1
    `;

    const [rows] = await db.execute(sql, [
      email,
    ]);

    return rows[0];
  }


  // ==========================================
  // FIND BY ID
  // ==========================================
  static async findById(id) {
    const sql = `
      SELECT *
      FROM users
      WHERE id = ?
      LIMIT 1
    `;

    const [rows] = await db.execute(sql, [
      id,
    ]);

    return rows[0];
  }


  // ==========================================
  // FIND ALL NORMAL USERS
  // ==========================================
  static async findAll() {
    const sql = `
      SELECT
        id,
        full_name,
        email,
        phone_number,
        role,
        department,
        account_status,
        profile_image,
        created_at,
        updated_at
      FROM users
      WHERE role = 'USER'
      ORDER BY created_at DESC
    `;

    const [rows] = await db.execute(sql);

    return rows;
  }


  // ==========================================
  // CHANGE PASSWORD BY EMAIL
  // ==========================================
  static async changePasswordByEmail(
    email,
    password_hash
  ) {
    const sql = `
      UPDATE users
      SET password_hash = ?
      WHERE email = ?
    `;

    await db.execute(sql, [
      password_hash,
      email,
    ]);
  }


  // ==========================================
  // CHANGE PASSWORD BY ID
  // ==========================================
  static async changePasswordById(
    id,
    password_hash
  ) {
    const sql = `
      UPDATE users
      SET password_hash = ?
      WHERE id = ?
    `;

    await db.execute(sql, [
      password_hash,
      id,
    ]);
  }


  // ==========================================
  // UPDATE ACCOUNT STATUS
  // ==========================================
  static async updateAccountStatusById(
    id,
    account_status
  ) {
    const sql = `
      UPDATE users
      SET account_status = ?
      WHERE id = ?
    `;

    await db.execute(sql, [
      account_status,
      id,
    ]);
  }


  // ==========================================
  // UPDATE PROFILE
  // ==========================================
  static async updateUserById(
    id,
    full_name,
    email,
    phone_number,
    department,
    profile_image
  ) {
    const sql = `
      UPDATE users
      SET
        full_name = ?,
        email = ?,
        phone_number = ?,
        department = ?,
        profile_image = ?
      WHERE id = ?
    `;

    await db.execute(sql, [
      full_name,
      email,
      phone_number,
      department,
      profile_image,
      id,
    ]);
  }
}

module.exports = User;

