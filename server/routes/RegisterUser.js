const {
  registerUser,
  checkUserAvailability,
  resendEmail,
} = require("../controllers/UserController");

const router = require("express").Router();

router.post("/", registerUser);
router.post("/check", checkUserAvailability);
router.post("/resend", resendEmail);

module.exports = router;
