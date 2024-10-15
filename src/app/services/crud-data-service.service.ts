import { Injectable } from '@angular/core';
import { AngularFirestoreModule,AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudDataServiceService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getAllContacts(){
    return this.afs.collection('/Contacts').snapshotChanges();
  }

  addContact(contact: any){
    contact.id = this.afs.createId();
    return this.afs.collection('/Contacts').add(contact);
  }

  deleteContact(contact : any){
    return this.afs.doc('/Contacts/'+contact.id).delete();
  }

}
