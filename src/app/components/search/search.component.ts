import {
  Component,
  EventEmitter,
  Output,
  HostListener,
  ViewChild,
} from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FilterPanelComponent } from '../filter-panel/filter-panel.component';
import { FormsModule } from '@angular/forms';

const expandInputAnimation = trigger('expandInput', [
  transition(':enter', [
    style({ width: '0', opacity: 0 }),
    animate('310ms ease-in-out', style({ width: '200px', opacity: 1 })),
  ]),
  transition(':leave', [
    animate('310ms ease-in-out', style({ width: '0', opacity: 0 })),
  ]),
]);

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FilterPanelComponent, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [expandInputAnimation],
})
export class SearchComponent {
  public searchQuery: string = '';
  public isSearchInputVisible: boolean = false;
  public isFilterPanelVisible: boolean = false;
  @Output() public searchToggle = new EventEmitter<boolean>();

  @ViewChild(FilterPanelComponent) filterPanelComponent!: FilterPanelComponent;

  public toggleFilterPanel(isVisible: boolean): void {
    this.isFilterPanelVisible = isVisible;
  }

  public toggleSearchInput(): void {
    this.isSearchInputVisible = !this.isSearchInputVisible;
    this.searchToggle.emit(this.isSearchInputVisible);
  }

  public updateFilterHistory(): void {
    if (this.filterPanelComponent) {
      this.filterPanelComponent.updateHistory(this.searchQuery);
      this.searchQuery = '';
    }
  }

  public onSearchClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  public handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const isClickInside =
      target.closest('.search__container') ||
      target.closest('app-filter-panel');

    if (!isClickInside) {
      this.isSearchInputVisible = false;
      this.isFilterPanelVisible = false;
      this.searchToggle.emit(this.isSearchInputVisible);
    }
  }
}
