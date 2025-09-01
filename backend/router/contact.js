import express from "express";
import Contact from "../models/Contact.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create contact
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    console.log('Received contact form data:', { name, email, subject, message });
    
    const newContact = new Contact({
      name,
      email,
      subject,
      message
    });
    
    await newContact.save();
    console.log('Contact saved successfully:', newContact._id);
    res.json(newContact);
  } catch (err) {
    console.error('Error saving contact:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all contacts (protected)
router.get('/', auth, async (req, res) => {
  try {
    console.log('Fetching all contacts for admin:', req.admin.username);
    
    const contacts = await Contact.find().sort({ date: -1 });
    console.log(`Found ${contacts.length} contacts`);
    
    res.json(contacts);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete contact (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Attempting to delete contact with ID:', id);
    
    // Validate ID format
    if (!id || id.length !== 24) {
      return res.status(400).json({ message: 'Invalid contact ID format' });
    }
    
    // Check if contact exists first
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    // Delete the contact using modern method
    const deletedContact = await Contact.findByIdAndDelete(id);
    
    if (deletedContact) {
      console.log('Contact deleted successfully:', id);
      res.json({ message: 'Contact removed successfully', deletedId: id });
    } else {
      console.log('Contact deletion failed:', id);
      res.status(500).json({ message: 'Failed to delete contact' });
    }
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete all contacts (protected)
router.delete('/', auth, async (req, res) => {
  try {
    console.log('Attempting to delete all contacts');
    
    // Get count before deletion
    const countBefore = await Contact.countDocuments();
    console.log('Contacts count before deletion:', countBefore);
    
    if (countBefore === 0) {
      return res.json({ message: 'No contacts to delete', deletedCount: 0 });
    }
    
    // Delete all contacts
    const result = await Contact.deleteMany({});
    
    console.log('Delete all result:', result);
    
    if (result.deletedCount > 0) {
      res.json({ 
        message: 'All contacts removed successfully', 
        deletedCount: result.deletedCount 
      });
    } else {
      res.status(500).json({ message: 'Failed to delete contacts' });
    }
  } catch (err) {
    console.error('Error deleting all contacts:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;