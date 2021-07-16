import { Injectable } from '@angular/core';
import { HttpRequestService } from 'src/app/services/http-request.service';

@Injectable({
  providedIn: 'root',
})
export class NewService {
  constructor(
    private httpRequestService: HttpRequestService,
  ) { }

  createNewUser(body: any) {
    return this.httpRequestService.postRequest('/users', body);
  }
}
