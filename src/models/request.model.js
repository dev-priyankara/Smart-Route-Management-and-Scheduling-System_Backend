const db = require("../../config/db");

class Request {
  static async create(
    user_id,
    worker_id,
    title,
    description,
    position,
    location,
    latitude,
    longitude,
    salary,
    job_type,
    work_mode,
    expected_start_date,
    payment_type,
  ) {
    const sql = `
      INSERT INTO requests (
        user_id,
        worker_id,
        title,
        description,
        position,
        location,
        latitude,
        longitude,
        salary,
        job_type,
        work_mode,
        expected_start_date,
        payment_type
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      user_id,
      worker_id,
      title,
      description,
      position,
      location,
      latitude,
      longitude,
      salary,
      job_type,
      work_mode,
      expected_start_date,
      payment_type,
    ]);

    return {
      id: result.insertId,
    };
  }

  static async updateStatusById(status, id) {
    const sql = `
      UPDATE requests
      SET status = ?
      WHERE id = ?
    `;

    await db.execute(sql, [status, id]);
  }

   static async updateStartJobStatusById( id) {
    const sql = `
      UPDATE requests
      SET is_start_job = 1
      WHERE id = ?
    `;

    await db.execute(sql, [id]);
  }

  static async getAll() {
    const sql = `
      SELECT
        r.*,

        -- Request Sender
        u.id AS sender_id,
        u.first_name AS sender_first_name,
        u.last_name AS sender_last_name,
        u.email AS sender_email,
        u.profile_image AS sender_profile_image,
        u.profession AS sender_profession,
        u.headline AS sender_headline,
        u.bio AS sender_bio,
        u.country_code AS sender_country_code,
        u.phone_number AS sender_phone_number,
        u.country AS sender_country,
        u.city AS sender_city,
        u.latitude AS sender_latitude,
        u.longitude AS sender_longitude,
        u.experience_years AS sender_experience_years,
        u.average_rating AS sender_average_rating,
        u.is_available AS sender_is_available,
        u.user_role AS sender_user_role,
        u.account_status AS sender_account_status,

        -- Requested Worker
        w.id AS worker_user_id,
        w.first_name AS worker_first_name,
        w.last_name AS worker_last_name,
        w.email AS worker_email,
        w.profile_image AS worker_profile_image,
        w.profession AS worker_profession,
        w.headline AS worker_headline,
        w.bio AS worker_bio,
        w.country_code AS worker_country_code,
        w.phone_number AS worker_phone_number,
        w.country AS worker_country,
        w.city AS worker_city,
        w.latitude AS worker_latitude,
        w.longitude AS worker_longitude,
        w.experience_years AS worker_experience_years,
        w.average_rating AS worker_average_rating,
        w.is_available AS worker_is_available,
        w.user_role AS worker_user_role,
        w.account_status AS worker_account_status

      FROM requests r

      LEFT JOIN users u
        ON r.user_id = u.id

      LEFT JOIN users w
        ON r.worker_id = w.id
    `;

    const [rows] = await db.execute(sql);

    return rows;
  }

  static async getById(id) {
    const sql = `
      SELECT
        r.*,

        -- Request Sender
        u.id AS sender_id,
        u.first_name AS sender_first_name,
        u.last_name AS sender_last_name,
        u.email AS sender_email,
        u.profile_image AS sender_profile_image,
        u.profession AS sender_profession,
        u.headline AS sender_headline,
        u.bio AS sender_bio,
        u.country_code AS sender_country_code,
        u.phone_number AS sender_phone_number,
        u.country AS sender_country,
        u.city AS sender_city,
        u.latitude AS sender_latitude,
        u.longitude AS sender_longitude,
        u.experience_years AS sender_experience_years,
        u.average_rating AS sender_average_rating,
        u.is_available AS sender_is_available,
        u.user_role AS sender_user_role,
        u.account_status AS sender_account_status,

        -- Worker
        w.id AS worker_user_id,
        w.first_name AS worker_first_name,
        w.last_name AS worker_last_name,
        w.email AS worker_email,
        w.profile_image AS worker_profile_image,
        w.profession AS worker_profession,
        w.headline AS worker_headline,
        w.bio AS worker_bio,
        w.country_code AS worker_country_code,
        w.phone_number AS worker_country_code,
        w.country AS worker_country,
        w.city AS worker_city,
        w.latitude AS worker_latitude,
        w.longitude AS worker_longitude,
        w.experience_years AS worker_experience_years,
        w.average_rating AS worker_average_rating,
        w.is_available AS worker_is_available,
        w.user_role AS worker_user_role,
        w.account_status AS worker_account_status

      FROM requests r

      LEFT JOIN users u
        ON r.user_id = u.id

      LEFT JOIN users w
        ON r.worker_id = w.id

      WHERE r.id = ?
    `;

    const [rows] = await db.execute(sql, [id]);

    return rows[0];
  }

  static async getAllByUserId(user_id) {
    const sql = `
      SELECT
        r.*,

        u.id AS sender_id,
        u.first_name AS sender_first_name,
        u.last_name AS sender_last_name,
        u.email AS sender_email,
        u.profile_image AS sender_profile_image,
        u.profession AS sender_profession,
        u.headline AS sender_headline,
        u.bio AS sender_bio,
        u.country_code AS sender_country_code,
        u.phone_number AS sender_phone_number,
        u.country AS sender_country,
        u.city AS sender_city,
        u.latitude AS sender_latitude,
        u.longitude AS sender_longitude,
        u.experience_years AS sender_experience_years,
        u.average_rating AS sender_average_rating,
        u.is_available AS sender_is_available,
        u.user_role AS sender_user_role,
        u.account_status AS sender_account_status,

        w.id AS worker_user_id,
        w.first_name AS worker_first_name,
        w.last_name AS worker_last_name,
        w.email AS worker_email,
        w.profile_image AS worker_profile_image,
        w.profession AS worker_profession,
        w.headline AS worker_headline,
        w.bio AS worker_bio,
        w.country_code AS worker_country_code,
        w.phone_number AS worker_phone_number,
        w.country AS worker_country,
        w.city AS worker_city,
        w.latitude AS worker_latitude,
        w.longitude AS worker_longitude,
        w.experience_years AS worker_experience_years,
        w.average_rating AS worker_average_rating,
        w.is_available AS worker_is_available,
        w.user_role AS worker_user_role,
        w.account_status AS worker_account_status

      FROM requests r

      LEFT JOIN users u
        ON r.user_id = u.id

      LEFT JOIN users w
        ON r.worker_id = w.id

      WHERE r.user_id = ?
    `;

    const [rows] = await db.execute(sql, [user_id]);

    return rows;
  }

  static async getAllByWorkerId(worker_id) {
    const sql = `
      SELECT
        r.*,

        u.id AS sender_id,
        u.first_name AS sender_first_name,
        u.last_name AS sender_last_name,
        u.email AS sender_email,
        u.profile_image AS sender_profile_image,
        u.profession AS sender_profession,
        u.headline AS sender_headline,
        u.bio AS sender_bio,
        u.country_code AS sender_country_code,
        u.phone_number AS sender_phone_number,
        u.country AS sender_country,
        u.city AS sender_city,
        u.latitude AS sender_latitude,
        u.longitude AS sender_longitude,
        u.experience_years AS sender_experience_years,
        u.average_rating AS sender_average_rating,
        u.is_available AS sender_is_available,
        u.user_role AS sender_user_role,
        u.account_status AS sender_account_status,

        w.id AS worker_user_id,
        w.first_name AS worker_first_name,
        w.last_name AS worker_last_name,
        w.email AS worker_email,
        w.profile_image AS worker_profile_image,
        w.profession AS worker_profession,
        w.headline AS worker_headline,
        w.bio AS worker_bio,
        w.country_code AS worker_country_code,
        w.phone_number AS worker_phone_number,
        w.country AS worker_country,
        w.city AS worker_city,
        w.latitude AS worker_latitude,
        w.longitude AS worker_longitude,
        w.experience_years AS worker_experience_years,
        w.average_rating AS worker_average_rating,
        w.is_available AS worker_is_available,
        w.user_role AS worker_user_role,
        w.account_status AS worker_account_status

      FROM requests r

      LEFT JOIN users u
        ON r.user_id = u.id

      LEFT JOIN users w
        ON r.worker_id = w.id

      WHERE r.worker_id = ?
    `;

    const [rows] = await db.execute(sql, [worker_id]);

    return rows;
  }


  // static async updateRequestById(data) {
  //   const {
  //     id,
  //     title,
  //     description,
  //     position,
  //     location,
  //     latitude,
  //     longitude,
  //     salary,
  //     job_type,
  //     work_mode,
  //     expected_start_date,
  //     payment_type,
  //   } = data;

  //   const sql = `
  //     UPDATE requests
  //     SET
  //       title = ?,
  //       description = ?,
  //       position = ?,
  //       location = ?,
  //       latitude = ?,
  //       longitude = ?,
  //       salary = ?,
  //       job_type = ?,
  //       work_mode = ?,
  //       expected_start_date = ?,
  //       payment_type = ?
  //     WHERE id = ?
  //   `;

  //   await db.execute(sql, [
  //     title,
  //     description,
  //     position,
  //     location,
  //     latitude,
  //     longitude,
  //     salary,
  //     job_type,
  //     work_mode,
  //     expected_start_date,
  //     payment_type,
  //     id,
  //   ]);
  // }
}

module.exports = Request;