const Product = require("../models/Product");

exports.addProduct = (req, res) => {
  try {
    const {
      name,
      category,
      description,
      price,
      priceLabel,
      features,
      popular,
    } = req.body;
    if (
      !name ||
      !category ||
      !description ||
      !price ||
      !features ||
      popular === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }
    const product = new Product({
      name,
      category,
      description,
      price,
      priceLabel,
      features,
      popular,
    });
    product.save();
    return res.status(201).json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.fetchProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let products;

    if (id) {
      products = await Product.findById(id);
    } else {
      products = await Product.find();
    }

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found with given id",
      });
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: `${product.name} has been deleted`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      price,
      priceLabel,
      features,
      popular,
    } = req.body;

    let { id } = req.params;
    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found with given id",
      });
    }

    product.name = name || product.name;
    product.category = category || product.category;
    product.description = description || product.description;
    product.price = price || product.price;
    product.priceLabel = priceLabel || product.priceLabel;
    product.features = features || product.features;
    product.popular = popular || product.popular;

    await product.save();

    return res.status(200).json({
      success:true,
      message: "Product updated successfully"
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
