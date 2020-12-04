import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  public successMsg!: string;
  public errorMsg!: string;
  public contacts!: Contact[];
  name: string = '';
  email: string = '';
  location: string = '';
  primary: string ='';

  constructor(private contactService: ContactsService) { }

  ngOnInit() {
  }

  addContact() {
    this.successMsg = '';
    this.errorMsg = '';
    this.contactService.createContact(this.name, this.email, this.location, this.primary)
      .subscribe((createdContact: Contact[]) => {
        this.name = '';
        this.email = '';
        this.location = '';
        this.primary = '';
        this.successMsg = `Contact added`;
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      });
  }

}
