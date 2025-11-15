const Faq = require("../models/Faq");

exports.postFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;
    let faq = await Faq.findOne({ question });
    if (faq) {
      return res.status(400).json({
        success: false,
        message: "Faq already exist",
      });
    }

    await Faq.create({
      question,
      answer,
    });

    return res.status(201).json({
      success: true,
      message: "Faq created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getFaq = async (req, res) => {
  try {
    let faq = await Faq.find({ isActive: true }).sort({ createdAt: -1 });
    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "No FAQ found",
      });
    }
    return res.status(200).json({
      success: true,
      faq,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateFaq = async (req, res) => {
  try {
    let { id } = req.params;
    let { question, answer, isActive } = req.body;
    let faq = await Faq.findById(id);
    if (!faq) {
      return res.status(404).json({
        sucess: false,
        message: "Faq not found",
      });
    }

    faq.question = question || faq.question;
    faq.answer = answer || faq.answer;
    faq.isActive = isActive || faq.isActive;

    await faq.save();

    return res.status(200).json({
      success: false,
      message: "Faq updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteFaq = async (req, res) => {
  try {
    let { id } = req.params;
    let faq = await Faq.findById(id);
    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "Faq not found",
      });
    }
    await Faq.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Faq deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
