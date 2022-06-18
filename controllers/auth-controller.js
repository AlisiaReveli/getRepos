const axios = require("axios");
const clientID = process.env.clientID;
const clientSecret = process.env.clientSecret;
const Repo = require("../model/Repos");

const callback = (req, res) => {
  try {
    axios({
      method: "post",
      url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${req.query.code}`,
      // Set the content type header, so that we get the response in JSON
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => {
        access_token = response.data.access_token;
        getUserData(access_token, res);
      })
      .catch((error) => {
        console.log("error1", error);
      });
  } catch (error) {
    console.log("error2", error);
  }
};

const manually = async (req, res) => {
  const { password } = req.body;
  await axios({
    url: "https://api.github.com/user",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "token " + password,
      Accept: "application/vnd.github.v3+json",
    },
  })
    .then((response) => {
      access_token = response.data.access_token;
      getUserData(access_token, res);
    })
    .catch((error) => {
      console.log(error);
    });
};

getUserData = (access_token, res) => {
  axios({
    method: "get",
    url: `https://api.github.com/user`,
    headers: {
      Authorization: "token " + access_token,
    },
  }).then((response) => {
    userData = response.data;
    Repo.find({ gitId: response.data.id })
      .then((repos) => {
        if (repos.length !== 0) {
          res.send({
            user: userData,
            repos: repos,
          });
        } else {
          axios({
            method: "get",
            url: `https://api.github.com/users/${response.data.login}/repos`,
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
              Accept: "application/vnd.github.mercy-preview+json", // MUST ADD TO INCLUDE TOPICS
            },
          })
            .then((response) => {
              let responseData = [];
              response.data.forEach((element) => {
                const data = new Repo({
                  gitId: userData.id,
                  avatar_url: userData.avatar_url,
                  repo_name: element.name,
                  privacy: element.private,
                  repo_url: element.html_url,
                  allow_forking: element.allow_forking,
                  language: element.language,
                });
                data.save();
                responseData.push(data);
              });
              res.send({
                user: userData,
                repos: responseData,
              });
            })
            .catch((err) => {
              console.log("error", err);
            });
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  });
};

module.exports = {
  callback,
  manually,
};
