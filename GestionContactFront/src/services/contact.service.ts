import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from 'src/models/model.contact';

@Injectable()
export class ContactService {

    constructor(public http: HttpClient) {

    }

    getContacts(motCle:string,page:number,size:number) {
        return this.http.get("http://localhost:8080/api/chercherContacts?motCle="+motCle+"&size="+size+"&page="+page);
    }

    saveContact(contact:Contact){
        return this.http.post("http://localhost:8080/api/contacts",contact);
      }
}