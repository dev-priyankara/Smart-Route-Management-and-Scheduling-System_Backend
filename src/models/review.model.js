const db = require("../../config/db");

class Review {
  static async create(job_id, reviewer_id, reviewee_id, rating, comment) {
    const sql =
      "INSERT INTO reviews ( job_id, reviewer_id, reviewee_id, rating, comment) VALUES (?, ?, ?, ?, ?)";
    const [result] = await db.execute(sql, [
      job_id,
      reviewer_id,
      reviewee_id,
      rating,
      comment,
    ]);
    return { id: result.insertId };
  }

  static async getAllByRevieweeId(reviewee_id) {
    const [rows] = await db.query(
      `
    SELECT
      r.id,
      r.job_id,
      r.reviewer_id,
      r.reviewee_id,
      r.rating,
      r.comment,
      r.created_at,
      r.updated_at,

      reviewer.id AS reviewer_user_id,
      CONCAT(reviewer.first_name, ' ', reviewer.last_name) AS reviewer_name,
      reviewer.profile_image AS reviewer_profile_image,

      reviewee.id AS reviewee_user_id,
      CONCAT(reviewer.first_name, ' ', reviewer.last_name) AS reviewee_name,
      reviewee.profile_image AS reviewee_profile_image,

      j.title AS job_title,
      j.position AS job_position

    FROM reviews r

    INNER JOIN users reviewer
      ON r.reviewer_id = reviewer.id

    INNER JOIN users reviewee
      ON r.reviewee_id = reviewee.id

    INNER JOIN jobs j
      ON r.job_id = j.id

    WHERE r.reviewee_id = ?

    ORDER BY r.created_at DESC
    `,
      [reviewee_id],
    );

    return rows;
  }
}
module.exports = Review;
