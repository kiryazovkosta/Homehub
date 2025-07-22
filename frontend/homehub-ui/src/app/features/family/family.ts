import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

interface TeamMember {
  name: string;
  position: string;
  description: string;
  image: string;
  linkedin: string;
  twitter: string;
  email: string;
}

@Component({
  selector: 'app-family',
  imports: [CommonModule],
  templateUrl: './family.html',
  styleUrls: ['./family.scss']
})
export class Family implements OnInit, OnDestroy {
  teamMembers: TeamMember[] = [
    {
      name: 'Иван Петров',
      position: 'CEO & Основател',
      description: 'Страстен предприемач с над 10 години опит в технологичния сектор.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      linkedin: '#',
      twitter: '#',
      email: 'ivan@example.com'
    },
    {
      name: 'Мария Георгиева',
      position: 'Директор на дизайна',
      description: 'Креативен дизайнер, който превръща идеите в красиви реалности.',
      image: 'https://cao.bg/Images/News/Large/person.jpg',
      linkedin: '#',
      twitter: '#',
      email: 'maria@example.com'
    },
    {
      name: 'Стефан Димитров',
      position: 'Lead Developer',
      description: 'Експерт в модерните технологии и иновативни решения.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      linkedin: '#',
      twitter: '#',
      email: 'stefan@example.com'
    },
    {
      name: 'Елена Василева',
      position: 'Маркетинг мениджър',
      description: 'Стратегически мислител с дарба за свързване с хората.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      linkedin: '#',
      twitter: '#',
      email: 'elena@example.com'
    },
    {
      name: 'Николай Тодоров',
      position: 'UX/UI дизайнер',
      description: 'Създава потребителски опит, който оставя траен отпечатък.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
      linkedin: '#',
      twitter: '#',
      email: 'nikolay@example.com'
    },
    {
      name: 'Анна Стоянова',
      position: 'QA инженер',
      description: 'Гарантира качеството на всеки продукт, който създаваме.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face',
      linkedin: '#',
      twitter: '#',
      email: 'anna@example.com'
    }
  ];

  currentSlide = 0;
  slidesPerView = 3;
  translateX = 0;
  maxSlide = 0;
  dots: number[] = [];
  cardWidth = 332; // 300px + 32px gap
  touchStartX = 0;
  touchEndX = 0;

  ngOnInit(): void {
    this.updateSlidesPerView();
    this.updateDots();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  @HostListener('window:resize', [])
  onResize() {
    this.updateSlidesPerView();
    this.goToSlide(0);
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

  private updateSlidesPerView(): void {
    const width = window.innerWidth;
    if (width <= 480) {
      this.slidesPerView = 1;
    } else if (width <= 768) {
      this.slidesPerView = 2;
    } else {
      this.slidesPerView = 3;
    }

    this.maxSlide = Math.max(0, this.teamMembers.length - this.slidesPerView);
    this.updateDots();
  }

  private updateDots(): void {
    const dotsCount = Math.ceil(this.teamMembers.length / this.slidesPerView);
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