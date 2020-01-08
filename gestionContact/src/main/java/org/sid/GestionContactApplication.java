package org.sid;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import org.sid.dao.ContactRepository;
import org.sid.entities.Contact;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.codearte.jfairy.Fairy;
import io.codearte.jfairy.producer.person.Person;

@SpringBootApplication
public class GestionContactApplication implements CommandLineRunner {

	@Autowired
	private ContactRepository contactRepository;

	
	public static void main(String[] args) {
		SpringApplication.run(GestionContactApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
//		Contact contact1 = new Contact("John", "Doe", df.parse("12/02/1992"), "johndoe@mail.com", "0723438746",
//				"johndoe.jpeg");
//		Contact contact2 = new Contact("Jane", "Doe", df.parse("11/04/1972"), "janedoe@mail.com", "0793429141",
//				"janedoe.jpeg");
//		Contact contact3 = new Contact("Jared", "Doe", df.parse("28/06/1994"), "jareddoe@mail.com", "0703871892",
//				"jareddoe.jpeg");
//
//		contactRepository.save(contact1);
//		contactRepository.save(contact2);
//		contactRepository.save(contact3);
		
		//Fake data using JFairy
		Fairy fairy = Fairy.create();
		Person person = fairy.person();

		for(int i = 0; i<100; i++) {
			Person personFairy = fairy.person();
			Contact contact = new Contact();
			contact.setNom(personFairy.getFirstName());
			contact.setTel(personFairy.getTelephoneNumber());
			contact.setPrenom(personFairy.getLastName());
			contact.setEmail(personFairy.getEmail());
			contact.setDateNaissance(df.parse("12/02/1992"));
			contact.setPhoto(personFairy.getUsername()+".jpeg");
			contactRepository.save(contact);
		}
		
		
		//
		
		contactRepository.findAll().forEach(contact -> {
			System.out.println(contact.getNom());
		}
		);
		
		//contactRepository.deleteAll();
		
	}

}
