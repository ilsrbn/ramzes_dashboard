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
  ) {
    console.log({route: this.route.url});
  }

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
      path: '/app/todos',
      icon: 'read'
    },
    // {
    //   path: 'app/notes',
    //   icon: 'unordered-list'
    // }
  ];


}
