import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderSection, FooterSection, MainSection } from './layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderSection, FooterSection, MainSection],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Homehub application';
}
