const express = require("express");
const router = express.Router();

const tagsController = require("../controllers/tagsController");

router.get("/", tagsController.index);
router.get("/:id", tagsController.show);

router.post("/", tagsController.store);

router.put("/:id", tagsController.update);

router.delete("/:id", tagsController.destroy);

module.exports = router;
