// backend/controllers/contactController.js
const Contact = require("../models/Contact");

exports.createContact = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        const contact = await Contact.create({ name, email, phone, address });
        res.status(201).json(contact);


    } catch (err) {
        console.error(err);
        res.status(500).send('Error in creating Contact')
        
    }
}
exports.getAllContacts = async (req, res) => {
    try {
        const contact = await Contact.findAll();
        res.status(200).json(contact);

       

    } catch (err) {
        console.error(err);
        res.status(500).send('Error in  Getting Contacts');
        
    }
}
exports.getContactById = async (req, res) => {
    try {
        const id = req.params.id;
        const contact = await Contact.findByPk(id)
        if (!contact) {
            return res.status(404).json({message: "Contact Not Found"});
        }
        res.json(contact);

       

    } catch (err) {
        console.error(err);
        res.status(500).send('Error in  Getting Contact');
        
    }
}
exports.updateContact = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        const id = req.params.id;
        const contact =await  Contact.findByPk(id);
        if (!contact) {
            return res.status(404).json({ message: 'contact Not Found' });

        }
        contact.name = name || contact.name;
        contact.email = email || contact.email;
        contact.phone = phone || contact.phone;
        contact.address = address || contact.address;
        await contact.save();
        res.json(contact);

    } catch (err) {
        console.error({ msg: err.message });
        res.status(500).json({ message: "Error in updating contact" });

    }
}

exports.deleteContact = async (req, res) => {
    try {
        const id = req.params.id;
        const contact = await Contact.findByPk(id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not Found" });
        }
        await contact.destroy();
        res.json({ message: "Contact Deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({msg:"Error in deleting contact   "})
    }
}