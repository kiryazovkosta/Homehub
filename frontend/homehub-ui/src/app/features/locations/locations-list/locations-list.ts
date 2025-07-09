import { Component, OnInit } from '@angular/core';
import { LocationResponse } from '../../../models';
import { Observable } from 'rxjs';
import { LocationsService } from '../../../core/services';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-locations-list',
  imports: [CommonModule, MatCardModule],
  templateUrl: './locations-list.html',
  styleUrl: './locations-list.css'
})
export class LocationsList {
  locations: Location[] = [];
  locations$: Observable<LocationResponse[]>;

  constructor(private locationsService: LocationsService) {
    this.locations$ = this.locationsService.getLocations();
  }
}
