import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) { }

  signUp: Boolean;

  ngOnInit() {
    this.signUp = false;
  }

  onSignup(form: NgForm) {
    const email = form.value.signup_email;
    const password = form.value.signup_password;
    this.authService.signupUser(email, password);
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password);
  }

}
