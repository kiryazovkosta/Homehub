import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterSection } from './layout/footer';
import { HeaderSection } from './layout/header';
import { MainSection } from './layout/main';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderSection, MainSection, FooterSection],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Homehub application';
}
