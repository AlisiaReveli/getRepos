const mongoose = require("mongoose");
const Repo = mongoose.model(
  "Repo",
  new mongoose.Schema({
    gitId: Number,
    username: String,
    avatar_url: String,
    repo_name: String,
    privacy: Boolean,
    repo_url: String,
    allow_forking: Boolean,
    language: String,
  })
);
module.exports = Repo;
