import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/services/contact.service';
import { Contact } from 'src/models/model.contact';
import { FormsModule } from "@angular/forms";
import { AlertService } from 'ngx-alerts';
@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  idContact: number;
  contact: Contact = new Contact;
  mode: number =1;
  constructor(public activedRoute:ActivatedRoute,public contactService: ContactService, public router:Router) { 
    this.idContact = activedRoute.snapshot.params['id'];
  }

  ngOnInit() {

    this.contactService.getContact(this.idContact).subscribe(
      contact =>{
        console.log("Get contact");
        this.contact = contact;
      },err =>{
        console.log(err);
      }
      
    )
  }

  updateContact() {
      this.contactService.updateContact(this.contact).subscribe(
        data => {
          alert("Mise à jour effectueé");
          console.log("Mise à jour effectueé");
          this.router.navigate(['contacts']);
        },err => {
          alert("Un problème est survenu");
        }
      )
  }

}
