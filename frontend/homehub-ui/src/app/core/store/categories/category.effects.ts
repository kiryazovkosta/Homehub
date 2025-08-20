import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as CategoryActions from './category.actions';

import { InventoriesService } from "../../services";
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class CategoriesEffects {
    private actions$ = inject(Actions);
    private inventoriesService = inject(InventoriesService);

    loadInventoryCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CategoryActions.loadInventoryCategories),
            switchMap(() =>
                this.inventoriesService.getCategories().pipe(
                    map(categories => CategoryActions.loadInventoryCategoriesSuccess({ categories })),
                    catchError(error => of(CategoryActions.loadInventoryCategoriesFailure({ error })))
                )
            )
        )
    );
}