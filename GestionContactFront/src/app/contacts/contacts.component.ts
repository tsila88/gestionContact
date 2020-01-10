import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ContactService } from 'src/services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  pageContacts: any;
  motCle: string = "";
  size: number = 5;
  currentPage: number = 0;
  pages: Array<number>;

  data: any;

  constructor(private http: HttpClient, private contactService: ContactService,public router:Router) { }

  ngOnInit() {


  }

  doSearch() {
    console.log('Initialisiation ...');
    console.log('Current page : '+this.currentPage);
    this.contactService.getContacts(this.motCle, this.currentPage, this.size).subscribe(data => {
      console.log("The request Get was sent");
      this.pageContacts = data;
      this.data = data;
      console.log(this.data);
      this.pages = new Array(this.data.totalPages);
      
    }, err => {
      console.log(err);
    })
  }

  searchByMotCle() {
    console.log('Initialisiation ...');
    console.log('Current page : '+this.currentPage);
    this.currentPage = 0; //Pour mettre la première page à 0
    this.contactService.getContacts(this.motCle, this.currentPage, this.size).subscribe(data => {
      console.log("The request Get was sent");
      this.pageContacts = data;
      this.data = data;
      console.log(this.data);
      this.pages = new Array(this.data.totalPages);
      
    }, err => {
      console.log(err);
    })
  }

  gotoPage(i: number) {
    this.currentPage = i;
    this.doSearch();
  }

  onEditContact(contactId:number){
    this.router.navigate(['editContacts',contactId]);
  }
  onDelete(contact) {

    let confirm = window.confirm('Etes vous sur de vouloir supprimer le contact '+contact.nom+' '+contact.prenom+' ?');
    
    if (confirm) {
      this.contactService.deleteContact(contact).subscribe(
        data => {
          this.pageContacts.content.splice(
            this.pageContacts.content.indexOf(contact),1
          )
        }, err =>{
  
        }
      )
    }
    
  }
}
