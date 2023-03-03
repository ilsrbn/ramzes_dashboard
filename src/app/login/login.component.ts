import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../shared/auth.service';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {BaseHttpRequest} from '../api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showValidationErrors: boolean
  constructor(
    private baseHttp: BaseHttpRequest,
    private authService: AuthService,
    private router: Router,
  ) {}

  onFormSubmit(form: NgForm) {
    console.log(form.value);

    if (form.invalid) { return this.showValidationErrors = true }

    this.authService.login(form.value.email, form.value.password)
  }
}
