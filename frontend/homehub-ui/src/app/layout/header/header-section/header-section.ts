import { Component, HostListener, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-section',
  imports: [RouterLink],
  templateUrl: './header-section.html',
  styleUrls: ['./header-section.scss']
})
export class HeaderSection {
  isMobileMenuActive = false;

  protected authService: AuthService = inject(AuthService);
  readonly isLoggedIn = this.authService.isLoggedIn;

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
