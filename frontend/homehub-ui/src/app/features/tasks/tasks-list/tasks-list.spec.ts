import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksList } from './tasks-list';

describe('TasksList', () => {
  let component: TasksList;
  let fixture: ComponentFixture<TasksList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
