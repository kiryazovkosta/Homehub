import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './back-to-top.html',
  styleUrls: ['./back-to-top.scss']
})
export class BackToTop {
  isVisible = false;
  isPulse = false;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollTop > 300) {
      if (!this.isVisible) {
        this.isVisible = true;

        // Добавяне на pulse анимация при първо показване
        if (!this.isPulse) {
          this.isPulse = true;
          setTimeout(() => {
            this.isPulse = false;
          }, 2000);
        }
      }
    } else {
      this.isVisible = false;
    }

    // Скриване на бутона когато потребителят е най-горе
    if (scrollTop === 0) {
      this.isVisible = false;
    }
  }

  scrollToTop(): void {
    // Анимация при клик
    const button = document.getElementById('back-to-top');
    if (button) {
      button.style.transform = 'scale(0.9)';
      setTimeout(() => {
        button.style.transform = '';
      }, 150);
    }

    // Плавно скролиране нагоре
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Управление на фокуса за достъпност
    setTimeout(() => {
      const header = document.querySelector('.header');
      if (header) {
        (header as HTMLElement).focus();
      }
    }, 1000);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.scrollToTop();
    }
  }
}