package org.sid.web;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.sid.dao.ContactRepository;
import org.sid.entities.Contact;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping(path = "/api")
public class ContactRestController {

	@Autowired
	private ContactRepository contactRepository;
	Logger logger = LoggerFactory.getLogger(Contact.class);

	@RequestMapping(value = "/contacts", method = RequestMethod.GET)
	public List<Contact> getAllContacts() {

		List<Contact> contacts = new ArrayList<Contact>();
		contacts = contactRepository.findAll();
		if (contacts == null) {
			logger.info("There are no contacts");
		} else {
			logger.info("Contacts have been returned");
		}

		return contacts;
	}

	@RequestMapping(value = "/contacts/{id}", method = RequestMethod.GET)
	public Optional<Contact> getContact(@PathVariable Long id) {
		Optional<Contact> contact = contactRepository.findById(id);
		if (contact.isPresent()) {
			logger.info("The contacts with the id: " + id + " WAS FOUND");

		} else {
			logger.info("The contacts with the id: " + id + " NOT FOUND");
		}
		
		return contact;
	}

	@RequestMapping(value = "/contacts", method = RequestMethod.POST)
	public Contact saveContact(@RequestBody Contact contact) {

		if (contact.getId() != null) {
			logger.info("The contacts with the id: " + contact.getId() + " already exists");
			return null;
		} else {
			logger.info("The contacts with the was creatd");
		}
		return contactRepository.save(contact);
	}

	@RequestMapping(value = "/contacts/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Object> deleteContact(@PathVariable Long id) {
		Optional<Contact> contact = contactRepository.findById(id);

		if (!contact.isPresent()) {
			logger.error("The contacts with the id: " + id + " NOT FOUND");
			return ResponseEntity.notFound().build();
		}
		contactRepository.deleteById(id);
		return ResponseEntity.noContent().build();

	}

	@RequestMapping(value = "/contacts/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Object> updateContact(@PathVariable Long id, @RequestBody Contact contact) {
		Optional<Contact> contactToFind = contactRepository.findById(id);

		if (!contactToFind.isPresent()) {
			logger.error("The contacts with the id: " + id + " NOT FOUND");
			return ResponseEntity.notFound().build();
		}

		contactToFind.get().setNom(contact.getNom());
		contactToFind.get().setPrenom(contact.getPrenom());
		contactToFind.get().setEmail(contact.getEmail());
		contactToFind.get().setDateNaissance(contact.getDateNaissance());
		contactToFind.get().setPhoto(contact.getPhoto());
		contactToFind.get().setTel(contact.getTel());

		contactRepository.save(contactToFind.get());
		return ResponseEntity.ok().body(contactToFind);
	}

	@RequestMapping(value = "/chercherContacts", method = RequestMethod.GET)
	public Page<Contact> findContactsByName(@RequestParam(name = "motCle", defaultValue = "") String motCle,
			@RequestParam(name = "page", defaultValue = "0") int page,
			@RequestParam(name = "size", defaultValue = "5") int size) {
		return contactRepository.findContacts("%" + motCle + "%", PageRequest.of(page, size));

	}
}
