import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';
import { mergeMap } from 'rxjs/operators'
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {

  constructor(private contactService: ContactsService) { }
  public errorMsg!: string;
  public successMsg!: string;
  public contacts!: Contact[];
  public columns: string[] = ['name','email','location','primary','delete'];
  public loading = true;
  

  

  ngOnInit(): void {
    this.contactService.getContacts()
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
        this.loading = false;
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
        this.loading = false;
      })
  }

  deleteContact(id: string){
    this.contactService.deleteContact(id)
      .pipe(
        mergeMap(() => this.contactService.getContacts())
      )
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
        this.successMsg = "User succesfully deleted";
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      })
  }

}
