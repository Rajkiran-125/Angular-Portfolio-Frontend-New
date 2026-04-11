import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  tab: string = 'login';
  loader: boolean = false;

  loginForm: any = FormGroup;
  verifycationCodeForm: any = FormGroup;
  signUpForm: any = FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private router: Router,
    private fireauth: AngularFireAuth,
    private observer: BreakpointObserver,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [],
      password: []
    });
    this.verifycationCodeForm = this.fb.group({
      userName: [],
      code: []
    });
    this.signUpForm = this.fb.group({
      firstName: [],
      lastName: [],
      email: [],
      userName: [],
      password: [],
    });
  }

  login() {
    if (!this.loginForm.invalid) {
      this.loader = true;
      let obj = {
        "data": {
          "spname": "sp_Authentication",
          "parameters": {
            "flag": "login",
            "UserName": this.loginForm.value.userName,
            "Password": this.loginForm.value.password
          }
        }
      }
      this.api.post('index/json', obj).subscribe(res => {
        if (res['code'] == 200) {
          this.loader = false;
          if (res['results'].data && res['results'].data.length > 0) {
            localStorage.setItem('token', 'true');
            localStorage.setItem('profile', JSON.stringify(res['results'].data[0]));
            this.router.navigate(['/dashboard']);
            this.snackbar.openSnackBar('Login Successfully', 'success', 'Close');
            this.loginForm.reset();
          } else {
            this.snackbar.openSnackBar('Username or password is incorrect', 'error', 'Close');
          }
        } else {
          this.loader = false;
        }
        console.log('login', res);
      })
    }
  }

  verifyCode() {
    this.loader = true;
    let obj = {
      "data": {
        "spname": "sp_VerificationCode",
        "parameters": {
          "flag": "verify",
          "userName": this.verifycationCodeForm.value.userName,
          "code": this.verifycationCodeForm.value.code
        }
      }
    }

    this.api.post('index/json', obj).subscribe(res => {
      if (res['code'] == 200) {
        if (res['results'].data && res['results'].data[0].results && res['results'].data[0].results == 'Code verifyed successfully') {
          this.loader = false;
          this.tab = 'signUp';
          localStorage.setItem('verificationId', res['results'].data[0].id);
          this.snackbar.openSnackBar(res['results'].data[0].results, 'success', 'Close');
          this.verifycationCodeForm.reset();
        } else {
          this.loader = false;
          this.snackbar.openSnackBar('Username or code is incorrect', 'error', 'Close');
        }
      } else {
        this.loader = false;
      }
    })
  }

  signUp() {
    this.loader = true;
    let formData = {
      "firstName": this.signUpForm.value.firstName,
      "lastName": this.signUpForm.value.lastName,
      "email": this.signUpForm.value.email,
      "userName": this.signUpForm.value.userName,
      "password": this.signUpForm.value.password,
      "createdBy": localStorage.getItem('verificationId')
    }

    let obj = {
      "data": {
        "spname": "sp_UserSignUp",
        "parameters": {
          "flag": "signUp",
          "json_data": formData
        }
      }
    }

    this.api.post('index/json', obj).subscribe(res => {
      if (res['code'] == 200) {
        if (res['results'].data[0].results && res['results'].data[0].results == 'SignUp successfully') {
          this.loader = false;
          this.snackbar.openSnackBar(res['results'].data[0].results, 'success', 'Close');
          this.tab = 'login';
          this.signUpForm.reset();
        }
      } else {
        this.loader = false;
      }
    })
  }
}
