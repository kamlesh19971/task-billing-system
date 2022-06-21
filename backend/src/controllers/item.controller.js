const Item = require("../models/item");

exports.addItem = async (req, res) => {
  try {
    const { name, price } = req.body;

    const item = new Item({
      name,
      price,
    });

    item.save((err, result) => {
      if (err) {
        throw new Error("Can't add new item");
      }

      return res.send({ status: true, message: "Item Added Successfully" });
    });
  } catch (error) {
    return res.send({ status: false, error: "Server Issue" });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find({}).lean();

    return res.send({ status: true, items });
  } catch (error) {
    return res.send({ status: false, error: "Couldn't fetch Items" });
  }
};
