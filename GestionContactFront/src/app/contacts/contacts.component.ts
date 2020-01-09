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
    this.contactService.getContacts(this.motCle, this.currentPage, this.size).subscribe(data => {
      this.pageContacts = data;
      this.data = data;
      this.pages = new Array(this.data.totalPages);
      console.log("The request Get was sent");
    }, err => {
      console.log(err);
    })
  }

  searchByMotCle() {
    this.doSearch();
  }

  gotoPage(i: number) {
    this.currentPage = i;
    this.doSearch();
  }

  onEditContact(contactId:number){
    this.router.navigate(['editContacts',contactId]);
  }
  onDelete(contactId:number) {
    this.contactService.deleteContact(contactId).subscribe(
      data => {
        alert("Le contact a bien été supprimé");
        this.pageContacts.content.splice(
          this.pageContacts.content.indexOf(c)
        )
      }, err =>{

      }
    )
  }
}
