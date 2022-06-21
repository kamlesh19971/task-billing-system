const express = require("express");
const router = express.Router();

const controller = require("../controllers/bill.controller");

router.post("/add-bill", controller.addBill);

router.get("/get-my-bills", controller.getMyBills);

router.get("/get-sales-stats", controller.getSalesStats);

module.exports = router;
