"use client";

const Report = require("../models/report.model");

const getActivity = async () => {
  const row = await Report.getActivity();
  return row;
};

module.exports = {
  getActivity,
};
