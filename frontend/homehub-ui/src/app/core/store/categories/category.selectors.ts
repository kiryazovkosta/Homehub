import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CategoryState } from "./category.reducer";

export const selectInventoryCategoryState = createFeatureSelector<CategoryState>('categories');

export const selectInventoryCategories = createSelector(
    selectInventoryCategoryState,
    (state: CategoryState) => state.categories
);

export const selectInventoryCategoriesLoading = createSelector(
    selectInventoryCategoryState,
    (state: CategoryState) => state.loading
);

export const selectInventoryCategoriesFailure = createSelector(
    selectInventoryCategoryState,
    (state: CategoryState) => state.error
);