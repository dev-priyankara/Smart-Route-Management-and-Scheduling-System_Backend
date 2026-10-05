const jobService = require("../services/job.service");

const formatJob = (job) => ({
  id: job.id,
  user_id: job.user_id,
  worker_id: job.worker_id,

  title: job.title,
  position: job.position,
  description: job.description,
  location: job.location,
  latitude: job.latitude,
  longitude: job.longitude,
  salary: job.salary,
  job_type: job.job_type,
  work_mode: job.work_mode,
  status: job.status,
  expected_start_date: job.expected_start_date,
  payment_type: job.payment_type,
  rating: job.rating,
  is_review: job.is_review,
  review_status: job.review_status,
  created_at: job.created_at,
  updated_at: job.updated_at,

  // Sender / Job Owner
  sender: job.sender_id
    ? {
        id: job.sender_id,
        first_name: job.sender_first_name,
        last_name: job.sender_last_name,
        email: job.sender_email,

        profile_image: job.sender_profile_image
          ? Buffer.from(job.sender_profile_image).toString("base64")
          : null,

        profession: job.sender_profession,
        headline: job.sender_headline,
        bio: job.sender_bio,
        country_code: job.sender_country_code,
        phone_number: job.sender_phone_number,
        country: job.sender_country,
        city: job.sender_city,
        latitude: job.sender_latitude,
        longitude: job.sender_longitude,
        experience_years: job.sender_experience_years,
        average_rating: job.sender_average_rating,
        is_available: job.sender_is_available,
        user_role: job.sender_user_role,
        account_status: job.sender_account_status,
      }
    : null,

  // Worker
  worker: job.worker_user_id
    ? {
        id: job.worker_user_id,
        first_name: job.worker_first_name,
        last_name: job.worker_last_name,
        email: job.worker_email,

        profile_image: job.worker_profile_image
          ? Buffer.from(job.worker_profile_image).toString("base64")
          : null,

        profession: job.worker_profession,
        headline: job.worker_headline,
        bio: job.worker_bio,
        country_code: job.worker_country_code,
        phone_number: job.worker_phone_number,
        country: job.worker_country,
        city: job.worker_city,
        latitude: job.worker_latitude,
        longitude: job.worker_longitude,
        experience_years: job.worker_experience_years,
        average_rating: job.worker_average_rating,
        is_available: job.worker_is_available,
        user_role: job.worker_user_role,
        account_status: job.worker_account_status,
      }
    : null,
});

const create = async (req, res, next) => {
  try {
    const {
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
      status,
      expected_start_date,
      payment_type,
      review_status,
    } = req.body;
    const result = await jobService.create(
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
      status,
      expected_start_date,
      payment_type,
      review_status,
    );
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const updateStatusById = async (req, res, next) => {
  try {
    const { status, id } = req.body;
    await jobService.updateStatusById(status, id);
    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
};

const updateStatusByIdWithWorkerId = async (req, res, next) => {
  try {
    const { worker_id, status, id } = req.body;
    await jobService.updateStatusByIdWithWorkerId(worker_id, status, id);
    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
};

const updateRatingById = async (req, res, next) => {
  try {
    const { rating, id } = req.body;
    await jobService.updateRatingById(rating, id);
    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
};

const updateJobReviewStatusById = async (req, res, next) => {
  try {
    const { review_status, id } = req.body;
    await jobService.updateJobReviewStatusById(review_status, id);
    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
};

const getAll = async (_, res, next) => {
  try {
    const result = await jobService.getAll();

    const jobs = result.map(formatJob);

    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await jobService.getById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const data = formatJob(job);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getAllByUserId = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    const result = await jobService.getAllByUserId(user_id);

    const jobs = result.map(formatJob);

    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

const getAllByWorkerId = async (req, res, next) => {
  try {
    const { worker_id } = req.params;

    const result = await jobService.getAllByWorkerId(worker_id);

    const jobs = result.map(formatJob);

    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

const updateJobById = async (req, res, next) => {
  try {
    const {
      id,
      user_id,
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
    } = req.body;

    await jobService.updateJobById({
      id,
      user_id,
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
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  updateStatusById,
  updateStatusByIdWithWorkerId,
  updateRatingById,
  updateJobReviewStatusById,
  getAllByUserId,
  getAllByWorkerId,
  updateJobById,
};
