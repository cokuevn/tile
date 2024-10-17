import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.scss',
})
export class FilterPanelComponent {
  // Изначальная история
  private historySubject = new BehaviorSubject<string[]>([
    'закрепить теги',
    'кнопка',
    'приложение',
    'форма',
  ]);

  history$ = this.historySubject.asObservable();

  topFilters = [
    { id: 'participant', label: 'Я участник', checked: false },
    { id: 'strict-search', label: 'Строгий поиск', checked: false },
    { id: 'headlines', label: 'В заголовках', checked: false },
  ];

  bottomFilters = [
    { id: 'tags', label: 'Теги', checked: false },
    { id: 'requests', label: 'Просьбы', checked: false },
    { id: 'contacts', label: 'Контакты', checked: false },
  ];

  authorInput: string = '';

  updateHistory(searchQuery: string) {
    const currentHistory = this.historySubject.getValue();

    if (searchQuery.trim() !== '') {
      const newHistory = [...currentHistory, searchQuery.trim()];

      this.historySubject.next(newHistory);
    }
  }
}
