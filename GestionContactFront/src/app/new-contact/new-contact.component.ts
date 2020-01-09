import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/services/contact.service';
import { Contact } from 'src/models/model.contact'
import { from } from 'rxjs';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})
export class NewContactComponent implements OnInit {

  contact: Contact = new Contact;
  mode: number =1;
  constructor(private contactService: ContactService) { }

  ngOnInit() {
  }

  saveContact(dataForm) {
    console.log(this.contact);
    this.contactService.saveContact(dataForm).subscribe(
      data => {
        console.log(dataForm);
        this.contact=data;
      
        this.mode = 2;
      }, err => {
        console.log(JSON.parse(err._body).message);
      }
    );
  }

}
