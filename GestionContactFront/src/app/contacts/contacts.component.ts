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
  motCle: string = "";
  size: number = 5;
  currentPage: number = 0;
  pages: Array<number>;

  constructor(private http: HttpClient, private contactService: ContactService) { }

  ngOnInit() {


  }

  doSearch() {
    console.log('Initialisiation ...');
    this.contactService.getContacts(this.motCle, this.currentPage, this.size).subscribe(data => {
      this.pageContacts = data;
      this.pages = new Array(data.totalPages);
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
}
