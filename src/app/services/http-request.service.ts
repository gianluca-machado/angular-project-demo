import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';

/**
 * Http Request Provider
 */
@Injectable()
export class HttpRequestService {
  private retry: number = 1;

  private log: boolean = false;

  /**
   * @ignore
   */
  constructor(
    private http: HttpClient,
    public storageService: StorageService,
  ) { }

  /**
   * Get request.
   * @param url Url to request.
   */
  getRequest(url: string, responseType: any = {}): Promise<any> {
    return firstValueFrom(
      this.http.get(environment.api_url + url, responseType)
        .pipe(
          tap((data) => this.logger(data)),
          retry(this.retry),
        ),
    ).then((response: any) => response.body);
  }

  /**
   * Post request.
   * @param url Url to request.
   * @param body Body to request.
   */
  postRequest(url: string, body: any): Promise<any> {
    const options: any = {
      observe: 'response',
    };

    return firstValueFrom(
      this.http.post(environment.api_url + url, body, options)
        .pipe(
          tap((data) => this.logger(data)),
          retry(this.retry),
        ),
    ).then((response: any) => response.body);
  }

  /**
   * Put request.
   * @param url Url to request.
   * @param body Body to request.
   */
  putRequest(url: string, body: any): Promise<any> {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return firstValueFrom(
      this.http.put(environment.api_url + url, body, options)
        .pipe(
          tap((data) => this.logger(data)),
          retry(this.retry),
        ),
    ).then((response: any) => response.body);
  }

  /**
   * Post request with authorization header.
   * @param url Url to do request.
   * @param data Data of the body of request.
   * @param type Type of request.
   * @returns Promise Request or Response return.
   */
  async postRequestWithAuthorization(url: string, body: any, contentType: string = 'application/json', replaceToken?: string): Promise<any> {
    const options = await this.generateAuthorizationOptions(contentType, replaceToken);

    return firstValueFrom(
      this.http.post(environment.api_url + url, body, options)
        .pipe(
          tap((data) => this.logger(data)),
          retry(this.retry),
        ),
    ).then((response: any) => response.body);
  }

  /**
  * Get request with authorization header.
  * @param url Url to do request.
  * @returns Promise Request or Response return.
  */
  async getRequestWithAuthorization(url: string, contentType: string = 'application/json', replaceToken?: string): Promise<any> {
    const options = await this.generateAuthorizationOptions(contentType, replaceToken);

    return firstValueFrom(
      this.http.get(environment.api_url + url, options)
        .pipe(
          tap((data) => this.logger(data)),
          retry(this.retry),
        ),
    );
  }

  /**
   * Put request with authorization header.
   * @param url Url to do request.
   * @returns Promise Request or Response return.
   */
  async putRequestWithAuthorization(url: string, body: any, contentType: string = 'application/json', replaceToken?: string): Promise<any> {
    const options = await this.generateAuthorizationOptions(contentType, replaceToken);

    return firstValueFrom(
      this.http.put(environment.api_url + url, body, options)
        .pipe(
          tap((data) => this.logger(data)),
          retry(this.retry),
        ),
    );
  }

  /**
   * Delete request with authorization header.
   * @param url Url to do request.
   * @returns Promise Request or Response return.
   */
  async deleteRequestWithAuthorization(url: string, contentType: string = 'application/json', replaceToken?: string): Promise<any> {
    const options = await this.generateAuthorizationOptions(contentType, replaceToken);

    return firstValueFrom(
      this.http.delete(environment.api_url + url, options)
        .pipe(
          tap((data) => this.logger(data)),
          retry(this.retry),
        ),
    ).then((response: any) => response.body);
  }

  private async generateAuthorizationOptions(contentType, replaceToken) {
    const login = await this.storageService.retrieve('login');

    const options = {
      headers: {
        'Content-Type': contentType,
        Authorization: (replaceToken) || `${login.type} ${login.token}`,
      },
    };

    return new Promise<any>((resolve) => { resolve(options); });
  }

  private logger(data) {
    if (this.log) {
      console.log(data);
    }
  }
}
