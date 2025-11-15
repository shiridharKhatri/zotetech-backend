const express = require("express");
const {
  postFaq,
  getFaq,
  updateFaq,
  deleteFaq,
} = require("../controllers/faqController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

router.post("/add-faq", adminMiddleware, postFaq);
router.get("/fetch", getFaq);
router.put("/update-faq/:id", adminMiddleware, updateFaq);
router.delete("/delete-faq/:id", adminMiddleware, deleteFaq);

module.exports = router;
