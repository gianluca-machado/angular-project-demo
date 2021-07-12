import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  public newForm: FormGroup;

  public param_agreement: any = { url: 'https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf' };

  /**
   * @ignore
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  /**
   * @ignore
   */
  ngOnInit() {
    this.newForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
      confirm: ['', Validators.compose([Validators.required])],
      term: [false, Validators.compose([Validators.required])],
    });
  }

  submitForm() {
    const value = this.newForm.getRawValue();
    console.log(value);
    this.router.navigate(['login']);
  }
}
