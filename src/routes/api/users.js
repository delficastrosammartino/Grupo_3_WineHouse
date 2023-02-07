const express = require("express");
const router = express.Router();
const usersControllers = require("../../controllers/api/usersControllers");

router.get("/", usersControllers.list);
router.get("/detalles/:id", usersControllers.detail);

module.exports = router;
