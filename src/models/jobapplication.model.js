const db = require("../../config/db");
class JobApplication {
  static async create(job_id, worker_id) {
    const sql =
      "INSERT INTO job_applications ( job_id, worker_id) VALUES (?,?)";
    const [result] = await db.execute(sql, [job_id, worker_id]);
    return { id: result.insertId };
  }

  static async updateApplicationStatusById(status, id) {
    const sql = "UPDATE job_applications SET status = ? WHERE id = ?";
    await db.execute(sql, [status, id]);
  }

  static async deleteById(id) {
    const sql = "DELETE FROM job_applications WHERE id = ?";
    await db.execute(sql, [id]);
  }

  static async getAll() {
    const sql = `
    SELECT
      -- Application
      ja.id AS application_id,
      ja.status AS application_status,
      ja.created_at AS application_created_at,
      ja.updated_at AS application_updated_at,

      -- Job
      j.id AS job_id,
      j.user_id,
      j.worker_id,
      j.title,
      j.position,
      j.description,
      j.location,
      j.latitude,
      j.longitude,
      j.salary,
      j.job_type,
      j.work_mode,
      j.status AS job_status,
      j.expected_start_date,
      j.payment_type,
      j.review_status,
      j.rating,
      j.is_review,
      j.created_at AS job_created_at,
      j.updated_at AS job_updated_at,

      -- Sender / Job Owner
      sender.id AS sender_id,
      sender.first_name AS sender_first_name,
      sender.last_name AS sender_last_name,
      sender.email AS sender_email,
      sender.profile_image AS sender_profile_image,
      sender.profession AS sender_profession,
      sender.headline AS sender_headline,
      sender.bio AS sender_bio,
      sender.country_code AS sender_country_code,
      sender.phone_number AS sender_phone_number,
      sender.country AS sender_country,
      sender.city AS sender_city,
      sender.latitude AS sender_latitude,
      sender.longitude AS sender_longitude,
      sender.experience_years AS sender_experience_years,
      sender.average_rating AS sender_average_rating,
      sender.is_available AS sender_is_available,

      -- Worker
      worker.id AS worker_user_id,
      worker.first_name AS worker_first_name,
      worker.last_name AS worker_last_name,
      worker.email AS worker_email,
      worker.profile_image AS worker_profile_image,
      worker.profession AS worker_profession,
      worker.headline AS worker_headline,
      worker.bio AS worker_bio,
      worker.country_code AS worker_country_code,
      worker.phone_number AS worker_phone_number,
      worker.country AS worker_country,
      worker.city AS worker_city,
      worker.latitude AS worker_latitude,
      worker.longitude AS worker_longitude,
      worker.experience_years AS worker_experience_years,
      worker.average_rating AS worker_average_rating,
      worker.is_available AS worker_is_available

    FROM job_applications ja

    INNER JOIN jobs j
      ON ja.job_id = j.id

    LEFT JOIN users sender
      ON j.user_id = sender.id

    LEFT JOIN users worker
      ON ja.worker_id = worker.id

  `;

    const [result] = await db.execute(sql);

    return result;
  }

  static async getAllByWorkerId(worker_id) {
    const sql = `
    SELECT
      -- Application
      ja.id AS application_id,
      ja.status AS application_status,
      ja.created_at AS application_created_at,
      ja.updated_at AS application_updated_at,

      -- Job
      j.id AS job_id,
      j.user_id,
      j.worker_id,
      j.title,
      j.position,
      j.description,
      j.location,
      j.latitude,
      j.longitude,
      j.salary,
      j.job_type,
      j.work_mode,
      j.status AS job_status,
      j.expected_start_date,
      j.payment_type,
      j.review_status,
      j.rating,
      j.is_review,
      j.created_at AS job_created_at,
      j.updated_at AS job_updated_at,

      -- Sender / Job Owner
      sender.id AS sender_id,
      sender.first_name AS sender_first_name,
      sender.last_name AS sender_last_name,
      sender.email AS sender_email,
      sender.profile_image AS sender_profile_image,
      sender.profession AS sender_profession,
      sender.headline AS sender_headline,
      sender.bio AS sender_bio,
      sender.country_code AS sender_country_code,
      sender.phone_number AS sender_phone_number,
      sender.country AS sender_country,
      sender.city AS sender_city,
      sender.latitude AS sender_latitude,
      sender.longitude AS sender_longitude,
      sender.experience_years AS sender_experience_years,
      sender.average_rating AS sender_average_rating,
      sender.is_available AS sender_is_available,

      -- Worker
      worker.id AS worker_user_id,
      worker.first_name AS worker_first_name,
      worker.last_name AS worker_last_name,
      worker.email AS worker_email,
      worker.profile_image AS worker_profile_image,
      worker.profession AS worker_profession,
      worker.headline AS worker_headline,
      worker.bio AS worker_bio,
      worker.country_code AS worker_country_code,
      worker.phone_number AS worker_phone_number,
      worker.country AS worker_country,
      worker.city AS worker_city,
      worker.latitude AS worker_latitude,
      worker.longitude AS worker_longitude,
      worker.experience_years AS worker_experience_years,
      worker.average_rating AS worker_average_rating,
      worker.is_available AS worker_is_available

    FROM job_applications ja

    INNER JOIN jobs j
      ON ja.job_id = j.id

    LEFT JOIN users sender
      ON j.user_id = sender.id

    LEFT JOIN users worker
      ON ja.worker_id = worker.id

    WHERE ja.worker_id = ?
  `;

    const [result] = await db.execute(sql, [worker_id]);

    return result;
  }

  static async getAllByJobId(job_id) {
    const sql = `
    SELECT
      -- Application
      ja.id AS application_id,
      ja.status AS application_status,
      ja.created_at AS application_created_at,
      ja.updated_at AS application_updated_at,

      -- Job
      j.id AS job_id,
      j.user_id,
      j.worker_id,
      j.title,
      j.position,
      j.description,
      j.location,
      j.latitude,
      j.longitude,
      j.salary,
      j.job_type,
      j.work_mode,
      j.status AS job_status,
      j.expected_start_date,
      j.payment_type,
      j.review_status,
      j.rating,
      j.is_review,
      j.created_at AS job_created_at,
      j.updated_at AS job_updated_at,

      -- Sender / Job Owner
      sender.id AS sender_id,
      sender.first_name AS sender_first_name,
      sender.last_name AS sender_last_name,
      sender.email AS sender_email,
      sender.profile_image AS sender_profile_image,
      sender.profession AS sender_profession,
      sender.headline AS sender_headline,
      sender.bio AS sender_bio,
      sender.country_code AS sender_country_code,
      sender.phone_number AS sender_phone_number,
      sender.country AS sender_country,
      sender.city AS sender_city,
      sender.latitude AS sender_latitude,
      sender.longitude AS sender_longitude,
      sender.experience_years AS sender_experience_years,
      sender.average_rating AS sender_average_rating,
      sender.is_available AS sender_is_available,

      -- Worker
      worker.id AS worker_user_id,
      worker.first_name AS worker_first_name,
      worker.last_name AS worker_last_name,
      worker.email AS worker_email,
      worker.profile_image AS worker_profile_image,
      worker.profession AS worker_profession,
      worker.headline AS worker_headline,
      worker.bio AS worker_bio,
      worker.country_code AS worker_country_code,
      worker.phone_number AS worker_phone_number,
      worker.country AS worker_country,
      worker.city AS worker_city,
      worker.latitude AS worker_latitude,
      worker.longitude AS worker_longitude,
      worker.experience_years AS worker_experience_years,
      worker.average_rating AS worker_average_rating,
      worker.is_available AS worker_is_available

    FROM job_applications ja

    INNER JOIN jobs j
      ON ja.job_id = j.id

    LEFT JOIN users sender
      ON j.user_id = sender.id

    LEFT JOIN users worker
      ON ja.worker_id = worker.id

    WHERE j.id = ?
  `;

    const [result] = await db.execute(sql, [job_id]);

    return result;
  }

  static async getById(id) {
    const sql = `
    SELECT
      -- Application
      ja.id AS application_id,
      ja.status AS application_status,
      ja.created_at AS application_created_at,
      ja.updated_at AS application_updated_at,

      -- Job
      j.id AS job_id,
      j.user_id,
      j.worker_id,
      j.title,
      j.position,
      j.description,
      j.location,
      j.latitude,
      j.longitude,
      j.salary,
      j.job_type,
      j.work_mode,
      j.status AS job_status,
      j.expected_start_date,
      j.payment_type,
      j.review_status,
      j.rating,
      j.is_review,
      j.created_at AS job_created_at,
      j.updated_at AS job_updated_at,

      -- Sender / Job Owner
      sender.id AS sender_id,
      sender.first_name AS sender_first_name,
      sender.last_name AS sender_last_name,
      sender.email AS sender_email,
      sender.profile_image AS sender_profile_image,
      sender.profession AS sender_profession,
      sender.headline AS sender_headline,
      sender.bio AS sender_bio,
      sender.country_code AS sender_country_code,
      sender.phone_number AS sender_phone_number,
      sender.country AS sender_country,
      sender.city AS sender_city,
      sender.latitude AS sender_latitude,
      sender.longitude AS sender_longitude,
      sender.experience_years AS sender_experience_years,
      sender.average_rating AS sender_average_rating,
      sender.is_available AS sender_is_available,

      -- Worker
      worker.id AS worker_user_id,
      worker.first_name AS worker_first_name,
      worker.last_name AS worker_last_name,
      worker.email AS worker_email,
      worker.profile_image AS worker_profile_image,
      worker.profession AS worker_profession,
      worker.headline AS worker_headline,
      worker.bio AS worker_bio,
      worker.country_code AS worker_country_code,
      worker.phone_number AS worker_phone_number,
      worker.country AS worker_country,
      worker.city AS worker_city,
      worker.latitude AS worker_latitude,
      worker.longitude AS worker_longitude,
      worker.experience_years AS worker_experience_years,
      worker.average_rating AS worker_average_rating,
      worker.is_available AS worker_is_available

    FROM job_applications ja

    INNER JOIN jobs j
      ON ja.job_id = j.id

    LEFT JOIN users sender
      ON j.user_id = sender.id

    LEFT JOIN users worker
      ON ja.worker_id = worker.id

    WHERE ja.id = ?
  `;

    const [result] = await db.execute(sql, [id]);

    return result[0];
  }
}

module.exports = JobApplication;
