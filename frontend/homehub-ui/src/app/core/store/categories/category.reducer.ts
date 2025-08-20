import { HttpErrorResponse } from "@angular/common/http";
import { createReducer, on } from "@ngrx/store";
import { CategorySimpleResponse } from "../../../models";

import * as CategoryActions from "./category.actions";

export interface CategoryState {
    categories: CategorySimpleResponse[];
    loading: boolean;
    error: HttpErrorResponse | null
}

export const categoryInitialState: CategoryState = {
    categories: [],
    loading: false,
    error: null
}

export const categoryReducer = createReducer(
    categoryInitialState,
    on(CategoryActions.loadInventoryCategories, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(CategoryActions.loadInventoryCategoriesSuccess, (state, { categories }) => ({
        ...state,
        categories: categories,
        loading: false
    })),
    on(CategoryActions.loadInventoryCategoriesFailure, (state, { error }) => ({
        ...state,
        error: error,
        loading: false
    })),
    on(CategoryActions.loadInventoryCategoriesReset, state => ({
        ...state,
        categories: [],
        loading: false,
        error: null
    }))
);