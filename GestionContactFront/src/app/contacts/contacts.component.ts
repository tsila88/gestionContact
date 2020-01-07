import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ContactService } from 'src/services/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  pageContacts: any;
  constructor(private http: HttpClient,private contactService:ContactService) { }

  ngOnInit() {
    console.log('Initialsiation ...');

      this.contactService.getContacts().subscribe(data => {
        this.pageContacts = data;
        console.log("The request Get was sent");
      }, err => {
        console.log(err);
      })

  }

}
