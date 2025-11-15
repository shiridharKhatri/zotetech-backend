const { adminMail, clientMail } = require("../mails/contact");
const Contact = require("../models/Contact");
const { validationResult } = require("express-validator");
exports.sendMessage = async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: errors,
    });
  }
  try {
    const {
      firstName,
      lastName,
      email,
      number,
      companyName,
      serviceInterest,
      projectBudget,
      message,
    } = req.body;
    let contact = await Contact.find({ email });
    if (contact.length > 10) {
      return res.status(400).json({
        success: false,
        message: "Contact limit reached for this email address.",
      });
    }
    await Contact.create({
      firstName,
      lastName,
      email,
      number,
      companyName,
      serviceInterest,
      projectBudget,
      message,
    });

    const clientData = {
      name: firstName + " " + lastName,
      email: email,
      subject: "Thank you for contacting us",
      service: serviceInterest,
    };

    const adminData = {
      name: firstName + " " + lastName,
      email: email,
      subject: `New contact message from ${firstName} ${lastName}`,
      serviceInterest: serviceInterest,
      number: number,
      companyName: companyName,
      projectBudget: projectBudget,
      message: message,
    };

    clientMail(clientData);
    adminMail(adminData);

    return res.status(201).json({
      success: true,
      message:
        "Your message has been received successfully. Thank you for contacting us.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMessage = async (req, res) => {
  try {
    let { id } = req.params;
    let contact;
    if (id) {
      contact = await Contact.findOne({ _id: id });
    } else {
      contact = await Contact.find();
    }
    return res.status(200).json({
      success: true,
      contact,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    let { id } = req.params;
    let contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }
    await Contact.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
