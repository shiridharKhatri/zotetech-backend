const express = require("express");
const Contact = require("../models/Contact");
const {
  sendMessage,
  getMessage,
  deleteMessage,
} = require("../controllers/contactController");
const router = express.Router();
const { body } = require("express-validator");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.post(
  "/send",
  [
    body("firstName").not().isEmpty().withMessage("First name is required"),
    body("lastName").not().isEmpty().withMessage("Last name is required"),
    body("email").isEmail().withMessage("Please provide a valid email address"),
    body("number").not().isEmpty().withMessage("Phone number is required"),
    body("message").not().isEmpty().withMessage("Message is required"),
    body("companyName").not().isEmpty().withMessage("Company name is required"),
    body("serviceInterest")
      .not()
      .isEmpty()
      .withMessage("Service interest is required"),
    body("projectBudget")
      .not()
      .isEmpty()
      .withMessage("Project budget is required"),
  ],
  sendMessage
);

router.get("/fetch", adminMiddleware, getMessage);
router.delete("/delete/:id", adminMiddleware, deleteMessage);

module.exports = router;
