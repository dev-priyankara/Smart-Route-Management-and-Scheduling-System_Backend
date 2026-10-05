const requestService = require("../services/request.service");

const formatRequest = (request) => ({
  id: request.id,
  user_id: request.user_id,
  worker_id: request.worker_id,

  title: request.title,
  position: request.position,
  description: request.description,
  location: request.location,
  latitude: request.latitude,
  longitude: request.longitude,
  salary: request.salary,
  job_type: request.job_type,
  work_mode: request.work_mode,
  status: request.status,
  expected_start_date: request.expected_start_date,
  payment_type: request.payment_type,
  is_start_job: request.is_start_job,
  created_at: request.created_at,
  updated_at: request.updated_at,

  // Sender
  sender: request.sender_id
    ? {
        id: request.sender_id,
        first_name: request.sender_first_name,
        last_name: request.sender_last_name,
        email: request.sender_email,

        profile_image: request.sender_profile_image
          ? Buffer.from(request.sender_profile_image).toString("base64")
          : null,

        profession: request.sender_profession,
        headline: request.sender_headline,
        bio: request.sender_bio,
        country_code: request.sender_country_code,
        phone_number: request.sender_phone_number,
        country: request.sender_country,
        city: request.sender_city,
        latitude: request.sender_latitude,
        longitude: request.sender_longitude,
        experience_years: request.sender_experience_years,
        average_rating: request.sender_average_rating,
        is_available: request.sender_is_available,
        user_role: request.sender_user_role,
        account_status: request.sender_account_status,
      }
    : null,

  // Worker
  worker: request.worker_user_id
    ? {
        id: request.worker_user_id,
        first_name: request.worker_first_name,
        last_name: request.worker_last_name,
        email: request.worker_email,

        profile_image: request.worker_profile_image
          ? Buffer.from(request.worker_profile_image).toString("base64")
          : null,

        profession: request.worker_profession,
        headline: request.worker_headline,
        bio: request.worker_bio,
        country_code: request.worker_country_code,
        phone_number: request.worker_phone_number,
        country: request.worker_country,
        city: request.worker_city,
        latitude: request.worker_latitude,
        longitude: request.worker_longitude,
        experience_years: request.worker_experience_years,
        average_rating: request.worker_average_rating,
        is_available: request.worker_is_available,
        user_role: request.worker_user_role,
        account_status: request.worker_account_status,
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
      expected_start_date,
      payment_type,
    } = req.body;

    const result = await requestService.create(
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
    );

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (_, res, next) => {
  try {
    const result = await requestService.getAll();

    const requests = result.map(formatRequest);

    res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const request = await requestService.getById(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    const data = formatRequest(request);

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

    const result = await requestService.getAllByUserId(user_id);

    const requests = result.map(formatRequest);

    res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};

const getAllByWorkerId = async (req, res, next) => {
  try {
    const { worker_id } = req.params;

    const result = await requestService.getAllByWorkerId(worker_id);

    const requests = result.map(formatRequest);

    res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};

const updateStatusById = async (req, res, next) => {
  try {
    const { status, id } = req.body;

    await requestService.updateStatusById(status, id);

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const updateStartJobStatusById = async (req, res, next) => {
  try {
    const { id } = req.body;

    await requestService.updateStartJobStatusById(id);

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// const updateRequestById = async (req, res, next) => {
//   try {
//     const {
//       id,
//       user_id,
//       worker_id,
//       title,
//       description,
//       position,
//       location,
//       latitude,
//       longitude,
//       salary,
//       job_type,
//       work_mode,
//       expected_start_date,
//       payment_type,
//     } = req.body;

//     await requestService.updateRequestById({
//       id,
//       user_id,
//       worker_id,
//       title,
//       description,
//       position,
//       location,
//       latitude,
//       longitude,
//       salary,
//       job_type,
//       work_mode,
//       expected_start_date,
//       payment_type,
//     });

//     res.status(200).json({
//       success: true,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  create,
  getAll,
  getById,
  getAllByUserId,
  getAllByWorkerId,
  updateStatusById,
  updateStartJobStatusById,
  // updateRequestById,
};
