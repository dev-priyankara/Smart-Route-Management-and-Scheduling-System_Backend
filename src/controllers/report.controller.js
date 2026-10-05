const ReportService = require("../services/report.service");

const getBActivity = async (_, res, next) => {
  try {
    const activities = await ReportService.getActivity();

    return res.status(200).json({
      success: true,
      data: activities,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBActivity,
};
