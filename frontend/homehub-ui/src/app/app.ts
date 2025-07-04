import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocationsList } from './features/locations-list/locations-list';
import { TasksList } from './features/tasks-list/tasks-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LocationsList, TasksList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'homehub-ui';
}
