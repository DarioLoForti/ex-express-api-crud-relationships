const express = require("express");
const router = express.Router();

const tagsController = require("../controllers/tagsController");
const validator = require("../middleware/validator.js");
const { bodyData } = require("../validations/tags.js");

router.get("/", tagsController.index);
router.get("/:id", tagsController.show);

router.post("/", validator(bodyData), tagsController.store);

router.put("/:id", validator(bodyData), tagsController.update);

router.delete("/:id", tagsController.destroy);

module.exports = router;
