const express = require("express");
const router = express.Router();

const controller = require("../controllers/item.controller");

router.post("/add-item", controller.addItem);
router.get("/get-all-items", controller.getAllItems);

module.exports = router;
