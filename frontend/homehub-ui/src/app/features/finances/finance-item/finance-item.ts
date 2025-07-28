import { Component, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-finance-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finance-item.html',
  styleUrl: './finance-item.scss'
})
export class FinanceItem {
  id = input<string>();

    // Данни за финансовия запис
  financeRecord = {
    id: 'FIN-2024-001',
    title: 'Продажба продукт А',
    type: 'income',
    typeText: 'Приход',
    description: 'Продажба на основен продукт за клиент от София. Проектът включва пълноценен уеб сайт с модерен дизайн, responsive функционалност и SEO оптимизация.',
    amount: '+ 2,500.00 лв.',
    transactionDate: '15.01.2024',
    createdDate: '15.01.2024 14:30',
    lastModified: '20.01.2024 09:15',
    status: 'active',
    statusText: 'Активен',
    category: {
      id: 'CAT-001',
      name: 'Уеб дизайн',
      type: 'Приход'
    }
  };

  constructor() { }

    onBack(): void {
    console.log('Navigating back to finance list');

    // Визуална обратна връзка
    const button = document.querySelector('.btn-back') as HTMLElement;
    if (button) {
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = '';
      }, 150);
    }

    // Навигация към списъка
    const financeSection = document.querySelector('#finance');
    if (financeSection) {
      financeSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  // Добавяне на hover ефекти при инициализация
  ngAfterViewInit(): void {
    this.addHoverEffects();
    this.addKeyboardNavigation();
  }

  private addHoverEffects(): void {
    const buttons = document.querySelectorAll('.btn-edit-detail, .btn-delete, .btn-back');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        (button as HTMLElement).style.transform = 'translateY(-2px)';
      });

      button.addEventListener('mouseleave', () => {
        (button as HTMLElement).style.transform = '';
      });
    });
  }

  private addKeyboardNavigation(): void {
    document.addEventListener('keydown', (e) => {
      if (e.target && (e.target as HTMLElement).closest('.finance-detail-section')) {
        if (e.key === 'Escape') {
          this.onBack();
        }
      }
    });
  }
}