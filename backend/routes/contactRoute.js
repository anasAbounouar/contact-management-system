// backend/routes/contactRoutes.js
const express = require('express')

const router = express.Router();

const contactController = require("../controllers/contactController");


// @route Get /api/contacts
// @desc Get all contacts
// @access Public
router.get('/', contactController.getAllContacts)
// @route Get /api/contact/:id
// @desc Get contact by id 
// @access Public
router.get('/:id', contactController.getContactById)
// @route Put /api/contact/:id
// @desc update contact by id
// @access Public
router.put('/:id', contactController.updateContact)
// @route delete /api/contact/:id
// @desc delete contact by id 
// @access Public
router.delete('/:id', contactController.deleteContact)

//@route Post /api/contacts
// @desc create a contact
// @access Public
router.post('/',contactController.createContact)


module.exports = router;