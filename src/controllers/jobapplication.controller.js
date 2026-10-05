const jobApplicationService = require("../services/jobapplication.service");

const formatJobApplication = (job) => ({
  // Job Application
  application_id: job.application_id,
  application_status: job.application_status,
  application_created_at: job.application_created_at,
  application_updated_at: job.application_updated_at,

  // Job
  id: job.job_id,
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
  status: job.job_status,
  expected_start_date: job.expected_start_date,
  payment_type: job.payment_type,
  review_status: job.review_status,
  rating: job.rating,
  is_review: job.is_review,
  created_at: job.job_created_at,
  updated_at: job.job_updated_at,

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
      }
    : null,
});

const create = async (req, res, next) => {
  try {
    const { job_id, worker_id } = req.body;
    const result = await jobApplicationService.create(job_id, worker_id);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const updateApplicationStatusById = async (req, res, next) => {
  try {
    const { status, id } = req.body;
    await jobApplicationService.updateApplicationStatusById(status, id);
    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await jobApplicationService.deleteById(id);
    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
};

const getAll = async (_, res, next) => {
  try {

    const result = await jobApplicationService.getAll();

    const jobApplications = result.map(formatJobApplication);

    res.status(200).json({
      success: true,
      data: jobApplications,
    });
  } catch (error) {
    next(error);
  }
};

const getAllByWorkerId = async (req, res, next) => {
  try {
    const { worker_id } = req.params;

    const result = await jobApplicationService.getAllByWorkerId(worker_id);

    const jobApplications = result.map(formatJobApplication);

    res.status(200).json({
      success: true,
      data: jobApplications,
    });
  } catch (error) {
    next(error);
  }
};

const getAllByJobId = async (req, res, next) => {
  try {
    const { job_id } = req.params;

    const result = await jobApplicationService.getAllByJobId(job_id);

    const jobApplications = result.map(formatJobApplication);

    res.status(200).json({
      success: true,
      data: jobApplications,
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await jobApplicationService.getById(id);

    const jobApplications = formatJobApplication(result)

    res.status(200).json({
      success: true,
      data: jobApplications,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  updateApplicationStatusById,
  deleteById,
  getAll,
  getAllByJobId,
  getAllByWorkerId,getById
};
