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
    return new Promise<any>((resolve, reject) => {
      this.httpRequestService.postRequest('/users', body).subscribe({
        next: (data) => resolve(data.body),
        error: (error) => reject(error),
      });
    });
  }
}
