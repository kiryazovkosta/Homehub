import { Component } from '@angular/core';
import { AboutSection, Family } from "../../../features/common";
import { Login, Register } from "../../../auth";
import { ContactForm } from "../../../shared/components/contact-form/contact-form";
import { FinancesList, FinanceItem } from "../../../features/finances";

@Component({
  selector: 'app-main-section',
  standalone: true,
  templateUrl: './main-section.html',
  styleUrl: './main-section.scss',
  imports: [AboutSection, Login, Register, ContactForm, Family, FinancesList, FinanceItem]
})
export class MainSection {
}
