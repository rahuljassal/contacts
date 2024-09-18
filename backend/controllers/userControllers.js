const asyncHandler = require("express-async-handler");
const contactModels = require("../models/contactModels");
// @desc Get All contacts
// @route GET /api/contacts
// @access public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await contactModels.find();
  res.status(200).json(contacts);
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
  const contact = await contactModels.create({ name, email, phone });
  res.status(201).json(contact);
});
// @desc get a contact
// @route GET /api/contacts/:id
// @access public
const getContact = asyncHandler(async (req, res) => {
  const contact = await contactModels.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});
// @desc update a contact
// @route PUT /api/contacts/:id
// @access public
const updateContact = asyncHandler(async (req, res) => {
  const contact = await contactModels.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const updatedContact = await contactModels.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});
// @desc delete a contact
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = asyncHandler(async (req, res) => {
  try {
    const contact = await contactModels.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    res.status(404);
    throw new Error(err);
  }
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
