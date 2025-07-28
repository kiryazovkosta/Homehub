import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderSection, FooterSection } from './layout';
import { BackToTop } from "./layout/back-to-top/back-to-top";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderSection,
    FooterSection,
    BackToTop
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}