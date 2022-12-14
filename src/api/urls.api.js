const express = require("express")

const { getAllUrls ,postLinks} = require('../controllers/urls.controller');
const router = express.Router();

router.get("/urls/all", getAllUrls);

router.post('/urls/links',postLinks)



module.exports = router;