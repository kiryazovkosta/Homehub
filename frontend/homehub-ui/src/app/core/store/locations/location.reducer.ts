import { HttpErrorResponse } from "@angular/common/http";
import { createReducer, on } from "@ngrx/store";
import { LocationResponse } from "../../../models";

import * as LocationActions from "./location.actions";

export interface LocationState {
    locations: LocationResponse[];
    loading: boolean;
    error: HttpErrorResponse | null
}

export const locationInitialState: LocationState = {
    locations: [],
    loading: false,
    error: null
}

export const locationReducer = createReducer(
    locationInitialState,
    on(LocationActions.loadLocations, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(LocationActions.loadLocationsSuccess, (state, { locations }) => ({
        ...state,
        locations: locations,
        loading: false
    })),
    on(LocationActions.loadLocationsFailure, (state, { error }) => ({
        ...state,
        error: error,
        loading: false
    })),
    on(LocationActions.loadLocationsReset, state => ({
        ...state,
        locations: [],
        loading: false,
        error: null
    }))
);