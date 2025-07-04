import { Component, OnInit } from '@angular/core';
import { Location } from '../../models';
import { Observable } from 'rxjs';
import { LocationsService } from '../../core/services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-locations-list',
  imports: [CommonModule],
  templateUrl: './locations-list.html',
  styleUrl: './locations-list.css'
})
export class LocationsList {
  locations: Location[] = [];
  locations$: Observable<Location[]>;

  constructor(private locationsService: LocationsService) {
    this.locations$ = this.locationsService.getLocations();

    console.log(this.locations);
    console.log(this.locations$);
  }
}
