import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ MaterialModule, RouterLink, RouterLinkActive, NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  links = [
    { link: '/home', text: 'Home' },
    //{ link: '/research', text: 'Research' },
    //{ link: '/projects', text: 'Projects' },
    //{ link: '/blog', text: 'Blog' },
    //{ link: '/contact', text: 'Contact' },
  ];

  constructor() { }

}
