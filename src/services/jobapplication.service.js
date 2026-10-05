"use client";

const JobApplication = require("../models/jobapplication.model");

const create = async (job_id, worker_id) => {
  const newJobApplication = await JobApplication.create(job_id, worker_id);
  return newJobApplication;
};

const updateApplicationStatusById = async (status, id) => {
  await JobApplication.updateApplicationStatusById(status, id);
};

const deleteById = async (id) => {
  await JobApplication.deleteById(id);
};

const getAll = async () => {
  const row = await JobApplication.getAll()
  return row;
};

const getAllByWorkerId = async (worker_id) => {
  const row = await JobApplication.getAllByWorkerId(worker_id);
  return row;
};

const getAllByJobId = async (job_id) => {
  const row = await JobApplication.getAllByJobId(job_id);
  return row;
};

const getById = async (id) => {
  const row = await JobApplication.getById(id);
  return row;
};

module.exports = {
  create,
  updateApplicationStatusById,
  deleteById,
  getAll,
  getAllByWorkerId,
  getAllByJobId,
  getById,
};
