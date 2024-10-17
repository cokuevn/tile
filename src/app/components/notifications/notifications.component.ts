import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, interval, of } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-notifications',
  standalone: true,
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  protected notificationsSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  ngOnInit(): void {
    this.startNotificationInterval();
  }

  private startNotificationInterval(): void {
    interval(2500)
      .pipe(
        map((value) => value * 3),
        take(5),
        tap({
          next: (value) => this.notificationsSubject.next(value),
          error: (err) => console.error(err),
        }),
        catchError(() => {
          console.error('Error deleting folder:', Error);
          return of(null);
        })
      )
      .subscribe();
  }
}
