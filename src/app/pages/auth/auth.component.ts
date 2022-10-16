import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  login_form = new FormGroup({
    email: new FormControl('', [
        Validators.required,
        Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  })

  button_text: string = 'Login';
  button_disabled: boolean = false; 

  constructor(
    private auth: AuthService,
    private router: Router
  ) {

  }

  login() {
    try {
      this.button_text = 'Logging in...';
      this.button_disabled = true;
      this.auth.login_with_email_and_password(
        this.login_form.get('email')?.value, 
        this.login_form.get('password')?.value
      ).then((result) => {
        if (result) {
          this.router.navigateByUrl('/home');
          this.button_text = 'Login';
          this.button_disabled = false;
        } else {
          // show error
        }
      }).catch((error: Error) => {
        console.log('Login Error', error.message);
        this.button_disabled = false;
      })
    } catch (error: any) {
      console.log('Login Error', error.message);
      this.button_disabled = false;
    }
  }

  ngOnInit(): void {
  }

}
