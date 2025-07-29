import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener, inject, signal } from '@angular/core';
import { FamilyService } from '../../core/services';
import { FamilyWithUsersResponse } from '../../models/families/family-with-users-response.model';
import { UserSimplyResponse } from '../../models/users/simple-user-response.model';

@Component({
  selector: 'app-family',
  imports: [CommonModule],
  templateUrl: './family.html',
  styleUrls: ['./family.scss']
})
export class Family {
  private familyService: FamilyService = inject(FamilyService);

  family = signal<FamilyWithUsersResponse | null>(null);
  currentSlide = signal(0);
  slidesPerView = signal(3);
  translateX = signal(0);
  maxSlide = signal(0);
  dots = signal<number[]>([]);
  cardWidth = 332;
  touchStartX = 0;
  touchEndX = 0;

  constructor() {
    this.loadFamilyData();
  }

  loadFamilyData() {
    this.familyService.getFamilyWithMembers().subscribe({
      next: (family) => {
        this.family.set(family);
        if (family && family.users) {
          this.initializeCarousel(family.users);
        }
      },
      error: (error) => console.error('Error loading family:', error)
    });
  }

  private initializeCarousel(users: UserSimplyResponse[]): void {
    this.updateSlidesPerView(users.length);
  }

  @HostListener('window:resize', [])
  onResize() {
    const family = this.family();
    if (family && family.users) {
      this.initializeCarousel(family.users);
      this.goToSlide(0);
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].clientX;
    this.handleSwipe();
  }

  private updateSlidesPerView(usersCount: number): void {
    const width = window.innerWidth;
    let slidesPerView = 3;
    
    if (width <= 480) {
      slidesPerView = 1;
    } else if (width <= 768) {
      slidesPerView = 2;
    }

    this.slidesPerView.set(slidesPerView);
    this.maxSlide.set(Math.max(0, usersCount - slidesPerView));
    this.updateDots(usersCount);
  }

  private updateDots(usersCount: number): void {
    const dotsCount = Math.ceil(usersCount / this.slidesPerView());
    this.dots.set(Array(dotsCount).fill(0).map((_, i) => i));
  }

  private handleSwipe(): void {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.next();
      } else {
        this.prev();
      }
    }
  }

  prev(): void {
    if (this.currentSlide() > 0) {
      this.currentSlide.set(this.currentSlide() - 1);
      this.updateCarousel();
    }
  }

  next(): void {
    if (this.currentSlide() < this.maxSlide()) {
      this.currentSlide.set(this.currentSlide() + 1);
      this.updateCarousel();
    }
  }

  goToSlide(slideIndex: number): void {
    this.currentSlide.set(Math.max(0, Math.min(slideIndex, this.maxSlide())));
    this.updateCarousel();
  }

  private updateCarousel(): void {
    this.translateX.set(-this.currentSlide() * this.cardWidth);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.prev();
    } else if (event.key === 'ArrowRight') {
      this.next();
    }
  }
}