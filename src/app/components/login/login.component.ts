import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Globalconstant } from 'src/app/shared/global-constant';
import emailjs from '@emailjs/browser';
import { environment } from 'src/environments/environment';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';
import { TopbarComponent } from '../../layout/topbar/topbar.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  responseMessage: any;
  key = environment.emailJSKey;
  serviceId = environment.mailService;
  templateId = environment.templateId;
  toMail: string = 'Rajkiran';

  radius: number = 20;
  color: string = '#00909c';

  @ViewChild(TopbarComponent) topbar!: TopbarComponent;

  public isMobile = false;

  loader: boolean = false;
  loginForm: any = FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private router: Router,
    private fireauth: AngularFireAuth,
    private observer: BreakpointObserver,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [],
      // email: [null, [Validators.pattern(Globalconstant.emailRegex)]],
      password: []
    });
    this.observer.observe(['(min-width: 800px)']).subscribe((res) => {
      this.isMobile = res.matches;
    });
  }

  // Firebase
  // login() {
  //   let email = this.loginForm.value.email!;
  //   let password = this.loginForm.value.password!;
  //   if (!this.loginForm.invalid) {
  //     this.loader = true;
  //     this.fireauth.signInWithEmailAndPassword(email, password).then((res:any) => {
  //       localStorage.setItem('token', 'true');
  //       // this.loader = false;
  //       localStorage.setItem('user', email);
  //       localStorage.setItem('profile', JSON.stringify(res));
  //       this.router.navigate(['/dashboard']);
  //       this.snackbar.openSnackBar('Login Successfully', 'success', 'Close');
  //     }, (err:any) => {
  //       this.snackbar.openSnackBar('Email or Password is Incorrect','error','Close')
  //       // this.common.openSnackBar('Login id or Password is incorrect');
  //       console.log(err.message);
  //       this.loader = false;
  //     })
  //     // this.loginForm.reset();
  //     this.loader = false;
  //   }else{
  //     this.snackbar.openSnackBar('Form is Invalid','error','Close')
  //   }
  //   this.loader = false;
  // }

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
          }else{
            this.snackbar.openSnackBar('Username or password is incorrect', 'error', 'Close');
          }
        }else{
          this.loader = false;
        }
        console.log('login', res);
      })
    }
  }

  toggle = () => {
    this.topbar.toggleSidenav();
  };
}
