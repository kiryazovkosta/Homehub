import { createAction, props } from "@ngrx/store";
import { CategorySimpleResponse } from "../../../models";
import { HttpErrorResponse } from "@angular/common/http";

export const loadInventoryCategories = createAction(
    '[InventoryCategories] Load InventoryCategories'
);

export const loadInventoryCategoriesSuccess = createAction(
    '[InventoryCategories] Load InventoryCategories Success',
    props<{ categories: CategorySimpleResponse[] }>()
);

export const loadInventoryCategoriesFailure = createAction(
    '[InventoryCategories] Load InventoryCategories Failure',
    props<{ error: HttpErrorResponse|null }>()
);

export const loadInventoryCategoriesReset = createAction(
    '[InventoryCategories] Load InventoryCategories Reset'
)