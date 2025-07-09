import { CommonModule } from '@angular/common';
import { Component, HostListener, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-about-section',
  imports: [CommonModule],
  templateUrl: './about-section.html',
  styleUrl: './about-section.scss'
})
export class AboutSection implements AfterViewInit {
  @ViewChildren('serviceCard') serviceCards!: QueryList<ElementRef>;

  services = [
    {
      title: 'Услуга 1',
      description: 'Описание на първата услуга, която предлагаме на нашите клиенти.'
    },
    {
      title: 'Услуга 2',
      description: 'Описание на втората услуга, която предлагаме на нашите клиенти.'
    },
    {
      title: 'Услуга 3',
      description: 'Описание на третата услуга, която предлагаме на нашите клиенти.'
    }
  ];

  constructor(private elementRef: ElementRef) { 
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
    this.setupScrollAnimation();
  }

  private setupScrollAnimation(): void {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const index = element.getAttribute('data-index') || '0';

          // Add transition with delay based on index
          element.style.transition = `all 0.6s ease ${parseInt(index) * 0.1}s`;
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe each card
    this.serviceCards.forEach((card) => {
      observer.observe(card.nativeElement);
    });
  }
}
