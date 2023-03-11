import { Component } from '@angular/core';
import {BaseHttpRequest} from './api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private baseHttp: BaseHttpRequest
  ) {
    const token = localStorage.getItem('authBearer')
    if (token) { this.baseHttp.config.TOKEN = token }
  }

}
