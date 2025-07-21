import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderSection, FooterSection, MainSection } from './layout';
import { BackToTop } from "./features/common";

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
  protected title = 'Homehub application';
}
