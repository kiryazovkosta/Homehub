import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocationsList } from './features/locations-list/locations-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LocationsList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'homehub-ui';
}
