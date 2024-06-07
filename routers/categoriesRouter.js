const express = require("express");
const router = express.Router();

const categoriesController = require("../controllers/categoriesController");
const validator = require("../middleware/validator.js");
const { bodyData } = require("../validations/categories.js");

router.get("/", categoriesController.index);
router.get("/:id", categoriesController.show);

router.post("/", validator(bodyData), categoriesController.store);

router.put("/:id", validator(bodyData), categoriesController.update);

router.delete("/:id", categoriesController.destroy);

module.exports = router;
