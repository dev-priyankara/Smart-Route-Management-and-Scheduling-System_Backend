const Request = require("../models/request.model");

const create = async (
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
) => {
  const newRequest = await Request.create(
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

  return newRequest;
};

const updateStatusById = async (status, id) => {
  await Request.updateStatusById(status, id);
};

const updateStartJobStatusById = async (id) => {
  await Request.updateStartJobStatusById(id);
};

const getAll = async () => {
  const rows = await Request.getAll();

  return rows;
};

const getById = async (id) => {
  const row = await Request.getById(id);

  return row;
};

const getAllByUserId = async (user_id) => {
  const rows = await Request.getAllByUserId(user_id);

  return rows;
};

const getAllByWorkerId = async (worker_id) => {
  const rows = await Request.getAllByWorkerId(worker_id);

  return rows;
};

// const updateRequestById = async (data) => {
//   const {
//     id,
//     user_id,
//     worker_id,
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

//   // Check whether request exists
//   const request = await Request.getById(id);

//   if (!request) {
//     const error = new Error("Request not found");
//     error.statusCode = 404;
//     throw error;
//   }

//   // Check request ownership
//   if (Number(request.user_id) !== Number(user_id)) {
//     const error = new Error(
//       "You are not authorized to update this request",
//     );

//     error.statusCode = 403;
//     throw error;
//   }

//   await Request.updateRequestById({
//     id,
//     worker_id,
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
//   });
// };

module.exports = {
  create,
  getAll,
  getById,
  updateStatusById,
  updateStartJobStatusById,
  getAllByUserId,
  getAllByWorkerId,
  // updateRequestById,
};
