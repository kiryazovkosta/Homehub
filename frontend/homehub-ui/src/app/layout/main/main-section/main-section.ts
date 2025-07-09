import { Component } from '@angular/core';
import { AboutSection } from "../../../features/common";

@Component({
  selector: 'app-main-section',
  standalone: true,
  templateUrl: './main-section.html',
  styleUrl: './main-section.scss',
  imports: [AboutSection]
})
export class MainSection {
}
