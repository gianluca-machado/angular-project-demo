import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorHandleService } from 'src/app/services/error-handle.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss'],
})
export class ConnectionsComponent implements OnInit {
  public mercadoLivreLoading: boolean = false;

  public mercadoLivreClientIdVisible: boolean = false;

  public mercadoLivreClientSecretVisible: boolean = false;

  public mercadoLivreForm: FormGroup;

  /**
   * @ignore
   */
  constructor(
    private formBuilder: FormBuilder,
    private errorHandleService: ErrorHandleService,
  ) { }

  // eslint-disable-next-line class-methods-use-this
  ngOnInit(): void {
    this.mercadoLivreForm = this.formBuilder.group({
      client_id: [null, [Validators.required]],
      client_secret: [null, [Validators.required]],
    });
  }

  async submitmercadoLivreForm() {
    const value = this.mercadoLivreForm.getRawValue();
    console.log(value);

    // eslint-disable-next-line no-restricted-syntax
    for (const i in this.mercadoLivreForm.controls) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.mercadoLivreForm.controls.hasOwnProperty(i)) {
        this.mercadoLivreForm.controls[i].markAsDirty();
        this.mercadoLivreForm.controls[i].updateValueAndValidity();
      }
    }

    if (this.mercadoLivreForm.valid) {
      this.mercadoLivreLoading = true;
      try {
        // const response = await this.loginService.login(value);
        // console.log(response);

        // const remember = this.loginForm.controls.remember.value;
        // await this.storageService.store('login', response);
        // await this.storageService.store('remember', remember);
        // await this.storageService.store('email', value.email);
        // await this.storageService.store('first', true);

        // const message = await this.languageService.get('login.request.success');
        // this.nzMessageService.success(message);
        // this.router.navigate(['menu']);
      } catch (error) {
        this.errorHandleService.handleHttpError(error);
      } finally {
        this.mercadoLivreLoading = false;
      }
    }
  }
}
