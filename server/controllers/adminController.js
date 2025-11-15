const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Auth/Admin");
const ADMIN_SECRET = process.env.ADMIN_SECRET;

function generateUniqueId() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

exports.registerAdmin = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({
        success: false,
        message: "An administrator with the provided details already exists.",
      });
    }
    let newUniqueid;

    while (admin) {
      if (generateUniqueId() !== admin.uniqueId) {
        newUniqueid = generateUniqueId();
        break;
      }
    }

    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);
    await Admin.create({
      fullName,
      email,
      password: hashedPassword,
      uniqueId: newUniqueid || generateUniqueId(),
    });

    return res.status(201).json({
      success: false,
      message: "Admin created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      messahe: error.message,
    });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { uniqueId, password } = req.body;
    let admin = await Admin.findOne({ uniqueId });
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Administrator not found with the provided Unique ID.",
      });
    }

    let isPasswordCorrect = await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials. Please try again.",
      });
    }

    let payload = {
      id: admin._id,
    };
    let token = jwt.sign(payload, ADMIN_SECRET, { expiresIn: "7d" });

    admin.lastLoggedin = Date.now();
    await admin.save();

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
    ``;
  }
};

exports.changePassword = async (req, res) => {
  try {
    let { id } = req.admin;
    const { oldPassword, newpPssword } = req.body;

    let admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    let isCorrectPassword = await bcrypt.compare(oldPassword, admin.password);
    if (!isCorrectPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }
    z;
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(salt);

    admin.password = hashedPassword;
    await admin.save();

    return res.status(200).json({
      success: false,
      message: "Password has been reseted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
