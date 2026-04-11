import { Component, OnInit } from '@angular/core';
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
    private crudDate: CrudDataServiceService,
    private api: ApiService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit() {
    this.getContactDetails();
  }

  getAllContacts() {
    this.loader = true;
    this.crudDate.getAllContacts().subscribe((res) => {
      this.contactList = res.map((i: any) => {
        const data = i.payload.doc.data();
        data.id = i.payload.doc.id;
        this.loader = false;
        return data;
      });
    });
  }

  deleteContact(id: any) {
    let obj = {
      "data": {
        "spname": "sp_DeleteContactDetails",
        "parameters": {
          "Id": id
        }
      }
    }
    this.api.post('index/json', obj).subscribe(res => {
      console.log(res);
      if (res['code'] == 200) {
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
    this.api.post('index/json', obj).subscribe(res => {
      console.log(res);
      if (res['code'] == 200) {
        this.loader = false;
        this.contactList = res['results'].data;
      } else {
        this.loader = false;
      }
    })
  }
}
