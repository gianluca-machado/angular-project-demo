import { Injectable } from '@angular/core';
import { HttpRequestService } from 'src/app/services/http-request.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private httpRequestService: HttpRequestService,
  ) { }

  login(body: any) {
    return new Promise<any>((resolve, reject) => {
      this.httpRequestService.postRequest('/sessions', body).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
}
