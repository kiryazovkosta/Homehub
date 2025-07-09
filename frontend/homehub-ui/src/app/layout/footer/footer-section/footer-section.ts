import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-section',
  standalone: true,
  imports: [],
  templateUrl: './footer-section.html',
  styleUrl: './footer-section.scss'
})
export class FooterSection {
  currentYear: number = new Date().getFullYear();
}
