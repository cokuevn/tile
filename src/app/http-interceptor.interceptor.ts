import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Имитация ответа сервера для определенного запроса
    if (req.url.includes('api/filter')) {
      // Имитация данных для фильтров
      const mockResponse = {
        filters: [
          { label: 'Фильтр 1', value: 'filter1', checked: false },
          { label: 'Фильтр 2', value: 'filter2', checked: true },
          { label: 'Фильтр 3', value: 'filter3', checked: false },
        ],
      };
      return of(new HttpResponse({ status: 200, body: mockResponse })).pipe(
        delay(1000)
      );
    }

    if (req.url.includes('api/history')) {
      // Имитация истории фильтров
      const historyResponse = [
        'закрепить теги',
        'кнопка',
        'приложение',
        'форма',
      ];
      return of(new HttpResponse({ status: 200, body: historyResponse })).pipe(
        delay(1000)
      );
    }

    // Продолжение обработки других запросов
    return next.handle(req);
  }
}
