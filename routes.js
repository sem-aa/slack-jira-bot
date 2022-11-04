const { Router } = require("express");
const {checkTaskAndAddComment} = require('./cntrs')
const router = Router();


router.post("/", checkTaskAndAddComment);

module.exports = router;
