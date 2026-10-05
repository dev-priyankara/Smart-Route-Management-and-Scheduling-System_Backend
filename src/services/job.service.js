"use client";

const Job = require("../models/job.model");

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
  status,
  expected_start_date,
  payment_type,
  review_status,
) => {
  const newJOb = await Job.create(
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
  return newJOb;
};

const updateStatusById = async (status, id) => {
  await Job.updateStatusById(status, id);
};

const updateStatusByIdWithWorkerId = async (worker_id, status, id) => {
  await Job.updateStatusByIdWithWorkerId(worker_id, status, id);
};

const updateRatingById = async (rating, id) => {
  await Job.updateRatingById(rating, id);
};

const updateJobReviewStatusById = async (review_status, id) => {
  await Job.updateJobReviewStatusById(review_status, id);
};

const getAll = async () => {
  const row = await Job.getAll();
  return row;
};

const getById = async (id) => {
  const row = await Job.getById(id);
  return row;
};

const getAllByUserId = async (user_id) => {
  const row = await Job.getAllByUserId(user_id);
  return row;
};

const getAllByWorkerId = async (worker_id) => {
  const row = await Job.getAllByWorkerId(worker_id);
  return row;
};

const updateJobById = async (data) => {
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
  } = data;

  // Check whether the job exists
  const job = await Job.getById(id)

  if (!job) {
    const error = new Error("Job not found");
    error.statusCode = 404;
    throw error;
  }

  // Check job ownership
  if (Number(job.user_id) !== Number(user_id)) {
    const error = new Error(
      "You are not authorized to update this job"
    );
    error.statusCode = 403;
    throw error;
  }

  await Job.updateJobById({
    id,
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
