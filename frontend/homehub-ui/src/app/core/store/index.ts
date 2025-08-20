import { ActionReducerMap } from '@ngrx/store';
import * as fromLocations from './locations/location.reducer';
import * as fromCategories from './categories/category.reducer';

export interface AppState {
    locations: fromLocations.LocationState
    categories: fromCategories.CategoryState
}

export const reducers: ActionReducerMap<AppState> = {
    locations: fromLocations.locationReducer,
    categories: fromCategories.categoryReducer
}

export * from './locations/location.effects';
export * from './categories/category.effects';