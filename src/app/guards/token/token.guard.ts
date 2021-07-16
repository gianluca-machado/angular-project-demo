/* eslint-disable no-shadow */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { HttpRequestService } from 'src/app/services/http-request.service';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenGuard implements CanActivate {
  constructor(
    private storageService: StorageService,
    private httpRequestService: HttpRequestService,
    private router: Router,
  ) { }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const login = await this.storageService.retrieve('login');
    const remember = await this.storageService.retrieve('remember');
    const first = await this.storageService.retrieve('first');

    if (first) {
      await this.storageService.store('first', false);
      return new Promise<boolean>((resolve) => resolve(true));
    }

    if (!remember && !first) {
      await this.navigateToLogin();
      return new Promise<boolean>((resolve) => resolve(false));
    }

    try {
      await this.httpRequestService.postRequestWithAuthorization('/sessions/validate', null);
      return new Promise<boolean>((resolve) => resolve(true));
    } catch (error) {
      await this.navigateToLogin();
      return new Promise<boolean>((resolve) => resolve(false));
    }
  }

  private async navigateToLogin() {
    await this.storageService.clear();
    this.router.navigate(['login']);
  }
}
