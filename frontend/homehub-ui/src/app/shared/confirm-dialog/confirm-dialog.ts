import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss'
})
export class ConfirmDialog {
  message = input<string>();

  close = output();
  confirm = output();

  closeDialog() {
    console.log("close!!!");
    this.close.emit();
  }

  confirmDialog() {
    console.log("confirm");
    this.confirm.emit();
  }
}
