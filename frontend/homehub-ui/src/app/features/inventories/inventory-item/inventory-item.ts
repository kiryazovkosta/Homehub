import { Component, signal, OnInit, effect, inject, afterNextRender } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoriesService } from '../../../core/services/inventories.services';
import { InventoryResponse } from '../../../models';
import { ErrorMessage } from "../../../shared/error-message/error-message";
import { processError } from '../../../utils/error.utils';
import { ConfirmDialog } from "../../../shared/confirm-dialog/confirm-dialog";

@Component({
  selector: 'app-inventory-item',
  imports: [ErrorMessage, ConfirmDialog],
  templateUrl: './inventory-item.html',
  styleUrl: './inventory-item.scss'
})
export class InventoryItem implements OnInit {
  private readonly inventoryService: InventoriesService = inject(InventoriesService);
  private readonly router: Router = inject(Router);

  inventoryId = signal<string | null>(null);

  isEdit = signal<boolean>(false);
  isDeleted = signal<boolean>(false);

  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  inventory = signal<InventoryResponse | null>(null);

  constructor(private route: ActivatedRoute) {
    effect(() => {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      if (this.inventoryId()) {
        const id: string = this.inventoryId()!;
        this.inventoryService.getInventory(id).subscribe({
          next: (response: InventoryResponse) => {
            this.inventory.set(response);
            this.isLoading.set(false);
            this.errorMessage.set(null);
          },
          error: (err) => {
            console.log(err);
            this.isLoading.set(false);
            this.errorMessage.set(processError(err));
          }
        });
      }
    });
  }

  ngOnInit() {
    this.isEdit.set(this.route.snapshot.url.some(segment => segment.path === 'edit'));
    this.route.paramMap.subscribe(params => {
      this.inventoryId.set(params.get('id'));
    });
  }

  closeErrorMessage() {
    this.errorMessage.set(null);
  }

  delete() {
    this.isDeleted.set(false);
    this.inventoryService.delete(this.inventoryId() ?? '').subscribe({
      next: () => {
        this.isDeleted.set(false);
        this.errorMessage.set(null);
        console.log(`Deleted: ${this.inventoryId()}`);
        this.router.navigate(['/inventories']);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage.set(processError(err));
      }
    })
  }

  close() {
    console.log('cancel deletion....');
    this.isDeleted.set(false);
  }
}
