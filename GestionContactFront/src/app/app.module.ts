import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { from } from 'rxjs';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HttpClientModule }    from '@angular/common/http';
import { ContactService } from 'src/services/contact.service';
import { FormsModule } from '@angular/forms';
import { NewContactComponent } from './new-contact/new-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// Import your library
import { AlertModule } from 'ngx-alerts';

const appRoutes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'editContacts/:id', component: EditContactComponent},
  {path: 'new-contact', component: NewContactComponent},
  {path: '', redirectTo:'/about',pathMatch:'full'}
]
@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    AboutComponent,
    NewContactComponent,
    EditContactComponent,
    // include alert directive component in app module declarations
    
     
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'})
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
