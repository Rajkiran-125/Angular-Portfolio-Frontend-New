import { Component, OnInit, ViewChild } from '@angular/core';
import { TopbarComponent } from 'src/app/layout/topbar/topbar.component';
import { ApiService } from 'src/app/services/api.service';
import { CrudDataServiceService } from 'src/app/services/crud-data-service.service';
import { SnackbarService } from 'src/app/services/snackbar.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  contactList: any;
  loader: boolean = false;
  
  constructor(
    private crudDate:CrudDataServiceService,
    private api:ApiService,
    private snackbar: SnackbarService
  ){
    
  }

  ngOnInit() {
    // Initialize logic here (if needed)
    // this.getAllContacts();
    this.getContactDetails();
  }

  @ViewChild(TopbarComponent) topbar!: TopbarComponent;

  getAllContacts() {
    this.loader = true;
    this.crudDate.getAllContacts().subscribe((res) => {
      this.contactList = res.map((i: any) => {
        const data = i.payload.doc.data();  // Fix the typo here
        data.id = i.payload.doc.id;
        this.loader = false;
        return data;
      });
    });
  }

  // Firebase
  // deleteContact(contact: any) {
  //   if (window.confirm('Are you sure want to delete ' + contact.first_name + ' ' + contact.last_name)) {
  //     this.crudDate.deleteContact(contact)
  //   }
  // }

  // Node js server
  deleteContact(id){
    let obj = {
      "data": {
        "spname": "sp_DeleteContactDetails",
        "parameters": {
          "Id": id
        }
      }
    }
    this.api.post('index/json',obj).subscribe(res =>{
      console.log(res)
      if(res['code'] == 200){
        this.snackbar.openSnackBar(res['results']['data'][0]['results'], 'error');
        this.getContactDetails();
      }
    })
  }

  getContactDetails() {
    this.loader = true;
    let obj = {
      "data": {
        "spname": "sp_ContactDetails",
        "parameters": {
          "flag": "GET"
        }
      }
    }
    this.api.post('index/json',obj).subscribe(res =>{
      console.log(res)
      if(res['code'] == 200){
        this.loader = false;
        this.contactList = res['results'].data;
      }else{
        this.loader = false;
      }
    })
  }

  toggle = () => {
    this.topbar.toggleSidenav();
  };
}
