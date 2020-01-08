package org.sid.dao;

import org.sid.entities.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ContactRepository extends JpaRepository<Contact,Long>{

	@Query("select c from Contact c where c.nom like :x or c.prenom like :x")
	public Page<Contact> findContacts(@Param("x") String motCle, Pageable pageable);
}
