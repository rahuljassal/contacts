const asyncHandler = require("express-async-handler");
// @desc Get All contacts
// @route GET /api/contacts
// @access public
const getContacts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get all contacts" });
});

// @desc create contact
// @route POST /api/contacts
// @access public
const createContact = asyncHandler(async (req, res) => {
  console.log("req.body :>> ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  res.status(201).json({ message: "create a contact" });
});
// @desc get a contact
// @route GET /api/contacts/:id
// @access public
const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `view the contact ${req.params.id}` });
});
// @desc update a contact
// @route PUT /api/contacts/:id
// @access public
const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `update the contact ${req.params.id}` });
});
// @desc delete a contact
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `delete the contact ${req.params.id}` });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
