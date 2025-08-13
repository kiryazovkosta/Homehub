import { Component, effect, input, signal } from '@angular/core';

@Component({
  selector: 'app-smart-loader',
  imports: [],
  templateUrl: './smart-loader.html',
  styleUrl: './smart-loader.scss'
})
export class SmartLoader {
  message = input<string>("Зареждане...");
  loading = input<boolean>(false);
  minDuration = input<number>(300);

  visible = signal(false);

  constructor() {
    effect(() => {
      console.log('smart-loader');
      if (this.loading()) {
        this.visible.set(true);
      } else {
        setTimeout(() => {
          this.visible.set(false);
        }, this.minDuration())
      }
    });
  }
}
