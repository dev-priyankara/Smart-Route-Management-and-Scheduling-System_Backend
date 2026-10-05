const db = require("../../config/db");

class Report {
  static async getActivity() {
    const sql = `
  SELECT
    (SELECT COUNT(*)
     FROM users
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
    ) AS newUsers,

    (SELECT COUNT(*)
     FROM jobs
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
    ) AS newJobs,

    (SELECT COUNT(*)
     FROM job_applications
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
    ) AS applications,

    (SELECT COUNT(*)
     FROM jobs
     WHERE status = 'COMPLETED'
       AND updated_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
    ) AS completedJobs

        `;

    const [rows] = await db.execute(sql);

    return rows;
  }
}

module.exports = Report;
