import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/**
 * Login component.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  public passwordVisible: boolean = false;

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
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
      remember: [false],
    });
  }

  submitForm() {
    const value = this.loginForm.getRawValue();
    console.log(value);
    this.router.navigate(['menu']);
  }

  clickCreateAccount() {
    this.router.navigate(['new']);
  }
}
