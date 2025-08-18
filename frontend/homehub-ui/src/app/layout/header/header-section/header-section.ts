import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services';

@Component({
  selector: 'app-header-section',
  imports: [RouterLink],
  templateUrl: './header-section.html',
  styleUrls: ['./header-section.scss']
})
export class HeaderSection {
  isMobileMenuActive = false;

  protected authService: AuthService = inject(AuthService);
  protected router: Router = inject(Router);
  readonly isLoggedIn = this.authService.isLoggedIn;
  readonly isAdmin = this.authService.isAdmin;
  
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

  logout() {
    this.authService.logout();
    this.router.navigate(["/about"]);
  }
}
