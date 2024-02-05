const cartModel = require("../model/cartModel.js");

exports.makePayment = async (req, res) => {
  try {
    let updateCart = cartModel.updateOne({email:req.body.email}, { $set: { isNotification: true } })
    res.json({result:1, msg:"Payment done"});
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ result: -1, msg: "Internal server error", error: error.message });
  }
};
