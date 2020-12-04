import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private BASE_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.BASE_URL}/contacts`)
  }

  createContact(name: string, email: string, location:string, primary:string): Observable<Contact[]>{
    return this.http.post<Contact[]>(`${this.BASE_URL}/contacts`,{
      name, email, location, primary
    })
  }

  deleteContact(id: string): Observable<any>{
    return this.http.delete<Contact[]>(`${this.BASE_URL}/contacts/${id}`)
  }

}
