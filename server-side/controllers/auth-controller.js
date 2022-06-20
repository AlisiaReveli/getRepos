const axios = require("axios");
const clientID = process.env.clientID;
const clientSecret = process.env.clientSecret;
const Repo = require("../model/Repos");

const callback = (req, res) => {
  try {
    if (!isNaN(req.query.userID)) {
      Repo.find({ gitId: req.query.userID })
        .then((repos) => {
          if (repos.length !== 0) {
            res.send({
              user: {
                id: repos[0].gitId,
                login: repos[0].username,
                avatar_url: repos[0].avatar_url,
              },
              repos: repos,
            });
          } else {
            res.send('Please login again');
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else {
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
          console.log("error", error);
        });
    }

  } catch (error) {
    console.log("error2", error);
  }
};

const manually = async (req, res) => {
  try {
    const { password } = req.body;
    const response = await axios({
      url: "https://api.github.com/user",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "token " + password,
        Accept: "application/vnd.github.v3+json",
      },
    });
    userData = response.data;
    Repo.find({ gitId: response.data.id })
      .then((repos) => {
        if (repos.length !== 0) {
          res.send({
            user: {
              id: repos[0].gitId,
              login: repos[0].username,
              avatar_url: repos[0].avatar_url,
            },
            repos: repos,
          });
        } else {
          getUserRepos(response.data, password, res);
        }
      })


  } catch (error) {
    console.log(error);
  }
};

getUserData = (access_token, res) => {
  try {
    axios({
      method: "get",
      url: `https://api.github.com/user`,
      headers: {
        Authorization: "token " + access_token,
      },
    }).then((response) => {
      Repo.find({ gitId: response.data.id })
        .then((repos) => {
          if (repos.length !== 0) {
            res.send({
              user: {
                id: response.data.id,
                login: response.data.login,
                avatar_url: response.data.avatar_url,
              },
              repos: repos,
            });
          } else {
            getUserRepos(response.data, access_token, res);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    });
  } catch (error) {
    console.log(error);
  }

};

getUserRepos = (response, access_token, res) => {
  axios({
    method: "get",
    url: `https://api.github.com/users/${response.login}/repos`,
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
          gitId: element.owner.id,
          username: element.owner.login,
          avatar_url: element.owner.avatar_url,
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
        user: {
          id: responseData[0].id,
          login: responseData[0].username,
          avatar_url: responseData[0].avatar_url,
        },
        repos: responseData,
      });
    })
    .catch((err) => {
      console.log("error", err);
    });
}

module.exports = {
  callback,
  manually,
};
