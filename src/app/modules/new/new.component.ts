import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import faker from 'faker';
import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  public newForm!: FormGroup;

  public param_agreement: any = { url: 'https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf' };

  /**
   * @ignore
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private nzMessageService: NzMessageService,
    private translate: TranslateService,
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
        email: faker.internet.email(),
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

  submitForm() {
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
        this.translate.get('create_account.form.agreement_warning').subscribe((res: string) => {
          this.nzMessageService.warning(res);
        });
      } else {
        this.router.navigate(['login']);
      }
    }
  }
}
