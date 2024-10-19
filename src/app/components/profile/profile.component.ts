import { NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  isProfileMenuVisible: boolean = false;
  myGroup = new FormGroup({
    name: new FormControl('Цокуев Ислам'),
  });
  isVisibleInput = false;
  protected toggleProfileMenu(): void {
    this.isProfileMenuVisible = !this.isProfileMenuVisible;
  }

  protected toggleNameInput(): void {
    this.isVisibleInput = !this.isVisibleInput;
  }

  @HostListener('document:click', ['$event'])
  public handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const isClickInside = target.closest('.profile');

    if (!isClickInside) {
      this.isProfileMenuVisible = false;
    }
  }
}
