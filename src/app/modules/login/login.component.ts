import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ErrorHandleService } from 'src/app/services/error-handle.service';
import { LanguageService } from 'src/app/services/language.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

/**
 * Login component.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loading: boolean = false;

  public passwordVisible: boolean = false;

  public loginForm: FormGroup;

  /**
   * @ignore
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private nzMessageService: NzMessageService,
    private languageService: LanguageService,
    private errorHandleService: ErrorHandleService,
    private loginService: LoginService,
    private storageService: StorageService,
  ) { }

  /**
   * @ignore
   */
  async ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
      remember: [false],
    });

    const remember = await this.storageService.retrieve('remember');
    if (remember) {
      const email = await this.storageService.retrieve('email');
      this.loginForm.controls.email.setValue(email);
    }

    if (!environment.production) {
      this.loginForm.patchValue({
        email: 'admin@admin.com.br',
        password: '123456',
        remember: true,
      });
    }
  }

  async submitForm() {
    const value = this.loginForm.getRawValue();
    console.log(value);

    // eslint-disable-next-line no-restricted-syntax
    for (const i in this.loginForm.controls) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.loginForm.controls.hasOwnProperty(i)) {
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }
    }

    if (this.loginForm.valid) {
      this.loading = true;
      try {
        const response = await this.loginService.login(value);
        console.log(response);

        const remember = this.loginForm.controls.remember.value;
        await this.storageService.store('login', response);
        await this.storageService.store('remember', remember);
        await this.storageService.store('email', value.email);
        await this.storageService.store('first', true);

        const message = await this.languageService.get('login.request.success');
        this.nzMessageService.success(message);
        this.router.navigate(['menu']);
      } catch (error) {
        this.errorHandleService.handleHttpError(error);
      } finally {
        this.loading = false;
      }
    }
  }

  clickCreateAccount() {
    this.router.navigate(['new']);
  }
}
