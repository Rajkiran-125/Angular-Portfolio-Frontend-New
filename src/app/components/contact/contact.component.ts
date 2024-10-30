import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Globalconstant } from 'src/app/shared/global-constant';
import emailjs from '@emailjs/browser';
import { environment } from 'src/environments/environment';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';
import { CrudDataServiceService } from 'src/app/services/crud-data-service.service';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  responseMessage: any;
  key = environment.emailJSKey;
  serviceId = environment.mailService;
  templateId = environment.templateId;
  toMail: string = 'Rajkiran Jaiswar';

  contactForm: any = FormGroup;

  contactObj: any = {
    id: '',
    first_name: '',
    last_name: '',
    contact: '',
    email: '',
    message: ''
  }
  id = '';
  fist_name = '';
  last_name = '';
  contact = '';
  email = '';
  message = '';

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private router: Router,
    private crudData: CrudDataServiceService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: [null, [Validators.pattern(Globalconstant.nameRegex)]],
      // contactNumber: [null, [Validators.pattern(Globalconstant.contactNumberRegex)]],
      contactNumber: [null],
      email: [null, [Validators.pattern(Globalconstant.emailRegex)]],
      subject: [null, [Validators.minLength(10)]],
      message: [null, [Validators.minLength(20)]],
    });
  }

  onSubmit = async (): Promise<void> => {
    try {
      emailjs.init(this.key);
      const formData = this.contactForm.value;
      // let response = await emailjs.send(this.serviceId, this.templateId, {
      //   from_name: formData.name,
      //   to_name: this.toMail,
      //   from_email: formData.email,
      //   subject: formData.subject,
      //   message: formData.message,
      // });
      // console.log("response >>>", response);
      this.router.navigate(['/confirm']);
      // this.contactForm.reset();
      // this.snackbar.openSnackBar('contactForm submitted','success')
    } catch (err) {
      console.log("Error >>>", err);
    }
  };

  saveContactDetails() {
    let obj = {
      "data": {
        "spname": "sp_ContactDetails",
        "parameters": {
          "flag": "SAVE",
          "json_data": this.contactForm.value
        }
      }
    }
    this.api.post('index/json', obj).subscribe(res => {
      if (res['code'] == 200)
        console.log('Response >>>>>>>>>>', res);
      this.snackbar.openSnackBar(res['results']['data'][0]['results'], 'success');
      this.contactForm.reset();
    })
    console.log(this.contactForm);
  }

  

  addContact() {
    if (!this.contactForm.invalid) {
      this.contactObj.id = '',
        this.contactObj.first_name = this.contactForm.value.name,
        this.contactObj.last_name = this.contactForm.value.subject,
        this.contactObj.contact = this.contactForm.value.contactNumber,
        this.contactObj.email = this.contactForm.value.email,
        this.contactObj.message = this.contactForm.value.message,

        this.crudData.addContact(this.contactObj);

      this.snackbar.openSnackBar('Form submited successfully', 'success');
      // Object.keys(this.contactForm.controls).forEach(controlName => {
      //   this.contactForm.get(controlName)?.clearValidators();
      //   this.contactForm.get(controlName)?.updateValueAndValidity();
      // });

      this.contactForm.reset()
    }
    else {
      this.snackbar.openSnackBar('Fill all mandatory fields', 'success');
    }
  }
}
