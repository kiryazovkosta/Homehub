import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LocationState } from "./location.reducer";

export const selectLocationState = createFeatureSelector<LocationState>('locations');

export const selectLocations = createSelector(
    selectLocationState,
    (state: LocationState) => state.locations
);

export const selectLocationsLoading = createSelector(
    selectLocationState,
    (state: LocationState) => state.loading
);

export const selectLocationsFailure = createSelector(
    selectLocationState,
    (state: LocationState) => state.error
);