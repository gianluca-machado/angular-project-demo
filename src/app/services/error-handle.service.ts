import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandleService {
  constructor(
    private nzMessageService: NzMessageService,
    private languageService: LanguageService,
  ) { }

  async handleHttpError(error: any) {
    console.error(error);
    if (error.error.error) {
      const message = await this.languageService.get(error.error.message);
      console.log(message);
      this.nzMessageService.error(message);
    } else {
      const message = await this.languageService.get('api.error.message.generic_message');
      this.nzMessageService.error(message);
    }
  }
}
