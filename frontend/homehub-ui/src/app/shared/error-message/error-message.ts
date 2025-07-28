import { Component, computed, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-error-message',
  imports: [],
  templateUrl: './error-message.html',
  styleUrl: './error-message.scss'
})
export class ErrorMessage {
  private _errorMessage = signal<string | null>(null);

  @Input() set errorMessage(value: string|null) {
    this._errorMessage.set(value);
  }

  visible = computed(() => 
    this._errorMessage() !== undefined && 
    this._errorMessage() !== null &&  
    this._errorMessage()?.trim() !== null && 
    this._errorMessage()?.trim() !== ''
  );

  errorMessageText = computed(() => this._errorMessage());

  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
