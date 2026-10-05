const db = require("../../config/db");
class User {
  static async create(fname, lname, email, hash_password) {
    const sql =
      "INSERT INTO users (first_name, last_name, email, password_hash) VALUES (?,?,?,?)";
    const [result] = await db.execute(sql, [
      fname,
      lname,
      email,
      hash_password,
    ]);
    return { id: result.insertId };
  }

  static async findAdmin() {
    const sql = "SELECT id FROM users WHERE user_role = 'ADMIN' LIMIT 1";
    const [row] = await db.execute(sql);
    return row;
  }

  static async findByEmail(email) {
    const sql = "SELECT * FROM users WHERE email = ?";
    const [row] = await db.execute(sql, [email]);
    return row[0];
  }

  static async changePasswordByEmail(email, hash_password) {
    const sql = "UPDATE users SET password_hash = ? WHERE email = ?";
    await db.execute(sql, [hash_password, email]);
  }

  static async updateAccountStatusById(id,account_status) {
    const sql = "UPDATE users SET account_status = ? WHERE id = ?";
    await db.execute(sql, [account_status, id]);
  }

  static async findById(id) {
    const sql = "SELECT * FROM users WHERE id = ?";
    const [row] = await db.execute(sql, [id]);
    return row[0];
  }

  static async findAll() {
    const sql = "SELECT * FROM users WHERE user_role = 'USER'";
    const [row] = await db.execute(sql);
    return row;
  }

  static async updateUserById(
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
    hash_password,
  ) {
    const sql =
      "UPDATE users SET first_name = ?, last_name = ?, email = ?, password_hash = ?, profile_image = ?, profession = ?, headline = ?, bio = ?, country_code = ?, phone_number = ?, country = ?, city = ?, latitude = ?, longitude = ?, experience_years = ?, average_rating = ?, is_available = ?  WHERE id = ?";
    await db.execute(sql, [
      first_name,
      last_name,
      email,
      hash_password,
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
      id,
    ]);
  }

  static async updateUserAverageRating(id) {
    const sql = `
    UPDATE users
    SET average_rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM reviews
      WHERE reviewee_id = ?
    )
    WHERE id = ?
  `;

    await db.execute(sql, [id, id]);

  }
}

module.exports = User;
