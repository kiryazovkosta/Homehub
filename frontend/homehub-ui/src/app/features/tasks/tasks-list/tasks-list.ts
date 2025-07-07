import { Component } from '@angular/core';
import { TasksListCollectionResponse, TaskListResponse } from '../../../models';
import { Observable } from 'rxjs';
import { TasksService } from '../../../core/services';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-tasks-list',
  imports: [CommonModule, MatCardModule],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.scss'
})
export class TasksList {
  tasks$: Observable<TasksListCollectionResponse>;

  constructor(private tasksService: TasksService) {
    this.tasks$ = this.tasksService.getTasks();
  }
}
