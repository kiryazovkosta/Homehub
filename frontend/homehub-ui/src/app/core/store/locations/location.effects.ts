import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as LocationActions from './location.actions';

import { LocationsService } from "../../services";
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class LocationsEffects {
    private actions$ = inject(Actions);
    private locationsService = inject(LocationsService);

    loadLocations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LocationActions.loadLocations),
            switchMap(() =>
                this.locationsService.getLocations().pipe(
                    map(locations => LocationActions.loadLocationsSuccess({ locations })),
                    catchError(error => of(LocationActions.loadLocationsFailure({ error })))
                )
            )
        )
    );
}