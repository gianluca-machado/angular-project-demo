import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import faker from 'faker';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ErrorHandleService } from 'src/app/services/error-handle.service';
import { LanguageService } from 'src/app/services/language.service';
import { environment } from 'src/environments/environment';
import { NewService } from './new.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  public loading: boolean = false;

  public passwordVisible: boolean = false;

  public confirmPasswordVisible: boolean = false;

  public newForm: FormGroup;

  public param_agreement: any = { url: 'https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf' };

  /**
   * @ignore
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private nzMessageService: NzMessageService,
    private languageService: LanguageService,
    private newService: NewService,
    private errorHandleService: ErrorHandleService,
  ) { }

  /**
   * @ignore
   */
  ngOnInit() {
    this.newForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required, this.confirmationValidator]],
      term: [false],
    });

    if (!environment.production) {
      const password = faker.internet.password();
      console.log(password);

      this.newForm.patchValue({
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password,
        confirm: password,
        term: true,
      });
    }
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.newForm.controls.confirm.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } if (control.value !== this.newForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  async submitForm() {
    const value = this.newForm.getRawValue();
    console.log(value);

    // eslint-disable-next-line no-restricted-syntax
    for (const i in this.newForm.controls) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.newForm.controls.hasOwnProperty(i)) {
        this.newForm.controls[i].markAsDirty();
        this.newForm.controls[i].updateValueAndValidity();
      }
    }

    if (this.newForm.valid) {
      if (!this.newForm.controls.term.value) {
        const message = await this.languageService.get('create_account.form.agreement_warning');
        this.nzMessageService.warning(message);
      } else {
        this.loading = true;
        try {
          const response = await this.newService.createNewUser(value);
          console.log(response);

          const message = await this.languageService.get('create_account.request.success');
          this.nzMessageService.success(message);
          this.router.navigate(['login']);
        } catch (error) {
          this.errorHandleService.handleHttpError(error);
        } finally {
          this.loading = false;
        }
      }
    }
  }
}
