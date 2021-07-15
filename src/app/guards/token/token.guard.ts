import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenGuard implements CanActivate {
  constructor(
    private storageService: StorageService,
  ) { }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const login = await this.storageService.retrieve('login');
    console.log('guard: ', login);

    return new Promise<boolean>((resolve) => resolve(true));
  }
}
