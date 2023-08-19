const express = require("express");
const router = express.Router();
const { getDrinkData } = require("../controllers/drinkData/getDrinkData");
const { updateDrinkData } = require("../controllers/drinkData/updateDrinkData");
const { deleteDrinkData } = require("../controllers/drinkData/deleteDrinkData");
const { verifyJWT, verifyDrinkDataRequest } = require("../middlewares");

router.get("/data", verifyJWT, getDrinkData);
router.put("/data", verifyJWT, verifyDrinkDataRequest, updateDrinkData);
router.delete("/data", verifyJWT, deleteDrinkData);

module.exports = router;
