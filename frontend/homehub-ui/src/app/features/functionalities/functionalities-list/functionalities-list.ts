import { CommonModule } from '@angular/common';
import { Component, HostListener, ViewChildren, QueryList, ElementRef, AfterViewInit, OnDestroy, inject, signal, effect } from '@angular/core';

import { FunctionalitiesService } from '../../../core/services';
import { FunctionalityListResponse, PaginationListResponse } from '../../../models';

@Component({
  selector: 'app-functionalities-list',
  imports: [CommonModule],
  templateUrl: './functionalities-list.html',
  styleUrl: './functionalities-list.scss',
})
export class FunctionalitiesList implements AfterViewInit, OnDestroy {

  private functionalitiesService: FunctionalitiesService = inject(FunctionalitiesService);
  private observer?: IntersectionObserver;

  @ViewChildren('serviceCard') serviceCards!: QueryList<ElementRef>;

  functionalities = signal<PaginationListResponse<FunctionalityListResponse> | null>(null);
  error = signal<string | null>(null);

  constructor(private elementRef: ElementRef) {
    this.functionalitiesService.getFunctionalities().subscribe({
      next: data => {
        this.functionalities.set(data);
        this.error.set(null);
      },
      error: err => {
        this.error.set('Сървърът не е достъпен. Моля, опитайте по-късно.');
      }
    });

    effect(() => {
      if (this.error()) {
        console.error('Functionalities endpoint error:', this.error());
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrolled = window.pageYOffset;
    const heroElement = this.elementRef.nativeElement.querySelector('.hero');
    if (heroElement) {
      heroElement.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  }

  ngAfterViewInit(): void {
    this.serviceCards.changes.subscribe(() => {
      if (this.serviceCards.length > 0) {

        this.serviceCards.forEach(card => {
          card.nativeElement.classList.add('animate-in');
        });
        
        setTimeout(() => {
          this.setupScrollAnimation();
        }, 100);
      }
    });

    setTimeout(() => {
      if (this.serviceCards.length > 0) {
        this.serviceCards.forEach(card => {
          card.nativeElement.classList.add('animate-in');
        });
        this.setupScrollAnimation();
      }
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupScrollAnimation(): void {
    if (this.observer) {
      this.observer.disconnect();
    }

    if (!this.serviceCards || this.serviceCards.length === 0) {
      return;
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const index = element.getAttribute('data-index') || '0';
          
          element.classList.remove('animate-in');
          element.style.transition = `all 0.6s ease ${parseInt(index) * 0.1}s`;
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    this.serviceCards.forEach((card) => {
      this.observer!.observe(card.nativeElement);
    });
  }
}