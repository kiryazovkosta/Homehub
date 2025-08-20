import { ActionReducerMap } from '@ngrx/store';
import * as fromLocations from './locations/location.reducer'; 

export interface AppState {
    locations: fromLocations.LocationState
}

export const reducers: ActionReducerMap<AppState> = {
    locations: fromLocations.locationReducer
}

export * from './locations/location.effects';