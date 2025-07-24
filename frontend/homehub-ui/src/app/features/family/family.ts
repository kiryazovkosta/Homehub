import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener, inject } from '@angular/core';
import { FamilyService } from '../../core/services';
import { Observable } from 'rxjs';
import { FamilyWithUsersResponse } from '../../models/families/family-with-users-response.model';
import { UserSimplyResponse } from '../../models/users/simple-user-response.model';

@Component({
  selector: 'app-family',
  imports: [CommonModule],
  templateUrl: './family.html',
  styleUrls: ['./family.scss']
})
export class Family implements OnInit {
  private familyService: FamilyService = inject(FamilyService);

  family$: Observable<FamilyWithUsersResponse>;

  currentSlide = 0;
  slidesPerView = 3;
  translateX = 0;
  maxSlide = 0;
  dots: number[] = [];
  cardWidth = 332;
  touchStartX = 0;
  touchEndX = 0;

  constructor() {
    this.family$ = this.familyService.getFamilyWithMembers();
    console.log(this.family$);
  }


  ngOnInit(): void {
    this.family$.subscribe(family => {
      if (family && family.users) {
        this.initializeCarousel(family.users);
      }
    });
  }

  private initializeCarousel(users: UserSimplyResponse[]): void {
    this.updateSlidesPerView(users.length);
  }

  @HostListener('window:resize', [])
  onResize() {
    this.family$.subscribe(family => {
      if (family && family.users) {
        this.initializeCarousel(family.users);
        this.goToSlide(0);
      }
    });
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
    if (width <= 480) {
      this.slidesPerView = 1;
    } else if (width <= 768) {
      this.slidesPerView = 2;
    } else {
      this.slidesPerView = 3;
    }

    this.maxSlide = Math.max(0, usersCount - this.slidesPerView);
    this.updateDots(usersCount);
  }

  private updateDots(usersCount: number): void {
    const dotsCount = Math.ceil(usersCount / this.slidesPerView);
    this.dots = Array(dotsCount).fill(0).map((_, i) => i);
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
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateCarousel();
    }
  }

  next(): void {
    if (this.currentSlide < this.maxSlide) {
      this.currentSlide++;
      this.updateCarousel();
    }
  }

  goToSlide(slideIndex: number): void {
    this.currentSlide = Math.max(0, Math.min(slideIndex, this.maxSlide));
    this.updateCarousel();
  }

  private updateCarousel(): void {
    this.translateX = -this.currentSlide * this.cardWidth;
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