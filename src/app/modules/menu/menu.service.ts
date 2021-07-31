import { Injectable } from '@angular/core';
import { HttpRequestService } from 'src/app/services/http-request.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(
    private httpRequestService: HttpRequestService,
  ) { }

  getMenus() {
    return this.httpRequestService.getRequestWithAuthorization('/menu').then((response) => response.data);
  }

  getUser() {
    return this.httpRequestService.getRequestWithAuthorization('/users');
  }
}
