const express = require("express");
const router = express.Router();
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactControllers");
const tokenHandler = require("../middlewares/tokenHandler");

router.use(tokenHandler);
// all contact api &&  save contact
router.route("/").get(getContacts).post(createContact);

// get a single contact,update the contact and delete the contact
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
