import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header-section',
  templateUrl: './header-section.html',
  styleUrls: ['./header-section.scss']
})
export class HeaderSection {
  isMobileMenuActive = false;

  toggleMobileMenu(): void {
    this.isMobileMenuActive = !this.isMobileMenuActive;
  }

  closeMenu(): void {
    this.isMobileMenuActive = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const header = document.querySelector('.header');

    if (header && !header.contains(target)) {
      this.isMobileMenuActive = false;
    }
  }
}
