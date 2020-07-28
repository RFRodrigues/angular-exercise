import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _router: Router) { }

  title = 'Login';
  email = new FormControl('', Validators.email);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern('(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{1,}')
  ]);
  router: Router;
  emailHasError = undefined;
  passwordHasError = undefined;
  submited = false;

  ngDoCheck() {
    if (this.submited) {
      this.checkErrorField();
    }
  }

  onClickLogin = () => {
    this.submited = true;
    if (this.email.status === "VALID" && this.password.status === "VALID") {
      this._router.navigate(['items'], { state: { email: this.email.value } })
    }
    else {
      this.checkErrorField();
    }
  }

  checkErrorField = () => {
    if (this.email.value && this.email.status !== "VALID") {
      this.emailHasError = "Email Inválido";
    }
    else if (this.email.value && this.email.status === "VALID") {
      this.emailHasError = undefined;
    }
    else {
      this.emailHasError = "Não pode estar vazio";
    }
    if (this.password.value && this.password.status !== "VALID") {
      this.passwordHasError = "Password Inválida";
    }
    else if (this.password.value && this.password.status === "VALID") {
      this.passwordHasError = undefined;
    }
    else {
      this.passwordHasError = "Não pode estar vazio";
    }
  }


}
