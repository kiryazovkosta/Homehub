import { createAction, props } from "@ngrx/store";
import { LocationResponse } from "../../../models";
import { HttpErrorResponse } from "@angular/common/http";

export const loadLocations = createAction(
    '[Locations] Load Locations'
);

export const loadLocationsSuccess = createAction(
    '[Locations] Load Locations Success',
    props<{ locations: LocationResponse[] }>()
);

export const loadLocationsFailure = createAction(
    '[Locations] Load Locations Failure',
    props<{ error: HttpErrorResponse|null }>()
);

export const loadLocationsReset = createAction(
    '[Locations] Load Locations Reset'
)