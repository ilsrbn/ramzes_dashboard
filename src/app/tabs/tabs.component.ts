import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {

  constructor(
    private route: Router,
  ) {}

  tabs = [
    {
      path: '/app/photos',
      icon: 'picture'
    },
    {
      path: '/app/categories',
      icon: 'tags',
    },
    {
      path: '/app/posts',
      icon: 'book'
    }
  ];


}
