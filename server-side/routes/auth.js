const router = require("express").Router();

var authController = require("../controllers/auth-controller.js");

router.get("/github/callback", authController.callback, (req, res) => {
  console.log("callback");
  res.send("callback");
});


router.post("/manually-login", authController.manually);


module.exports = router;
