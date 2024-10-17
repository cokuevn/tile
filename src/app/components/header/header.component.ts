import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FilterPanelComponent } from '../filter-panel/filter-panel.component';

import { animate, style, transition, trigger } from '@angular/animations';
import { SearchComponent } from '../search/search.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { ProfileComponent } from '../profile/profile.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FilterPanelComponent,
    SearchComponent,
    NotificationsComponent,
    ProfileComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isSearchInputVisible = false;
  isMenuOpen = false; // Переменная для отслеживания состояния меню

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Переключаем состояние
  }
  // Обработка события toggleSearchInput
  onSearchToggle(isSearchInput: boolean) {
    this.isSearchInputVisible = isSearchInput;
  }
}
