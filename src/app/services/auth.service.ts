import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SnackbarService } from './snackbar.service';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireauth: AngularFireAuth,
    private snackbar: SnackbarService,
    private router: Router,
    private api: ApiService
  ) { }

  // Firebase
  // logout(){
  //   this.fireauth.signOut().then(() =>{
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('user');
  //     localStorage.removeItem('profile');
  //     this.router.navigate(['/login']);
  //     this.snackbar.openSnackBar('Logout','success');
  //   },err =>{
  //     this.snackbar.openSnackBar(err.message,'error');
  //     console.log(err.message);
  //     this.router.navigate(['/login']);
  //   });    
  // }


  logout() {
    let id = JSON.parse(localStorage.getItem('profile'))
    let obj = {
      "data": {
        "spname": "sp_Authentication",
        "parameters": {
          "flag": "logout",
          "UserName": "",
          "Password": "",
          "Id": id['Id']
        }
      }
    }

    this.api.post('index/json', obj).subscribe(res => {
      // console.log(res)
      if (res['code'] == 200) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('profile');
        localStorage.removeItem('verificationId');
        this.snackbar.openSnackBar('Logout', 'success');
        this.router.navigate(['/login']);
      }
    })

  }


  getToken(): string | null {
    return localStorage.getItem("token");
  }
  isLoggedIn() {
    return this.getToken() !== null;
  }
  isNotLoggedIn() {
    return this.getToken() == null;
  }
}
