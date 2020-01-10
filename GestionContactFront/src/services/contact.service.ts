import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from 'src/models/model.contact';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class ContactService {

    constructor(public http: HttpClient) {

    }

    getContacts(motCle:string,page:number,size:number) {
        return this.http.get("http://localhost:8080/api/chercherContacts?motCle="+motCle+"&size="+size+"&page="+page);
    }

    saveContact(contact:Contact): Observable<Contact>{
        return this.http.post<Contact>("http://localhost:8080/api/contacts",contact);
      }

    getContact(contactId:number): Observable<Contact>{
        return this.http.get<Contact>("http://localhost:8080/api/contacts/"+contactId);
    }

    updateContact(contact:Contact): Observable<Contact>{
        return this.http.put<Contact>("http://localhost:8080/api/contacts/"+contact.id,contact)
    }

    deleteContact(contact:Contact){
        return this.http.delete("http://localhost:8080/api/contacts/"+contact.id);
    }
}