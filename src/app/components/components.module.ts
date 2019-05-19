// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// components
import { SweetMessageComponent } from './sweet-message/sweet-message.component';
import { SweetQuestionComponent } from './sweet-question/sweet-question.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
  ],
  declarations: [
    SweetMessageComponent,
    SweetQuestionComponent,
  ],
  providers: [],
  exports: [
    SweetMessageComponent,
    SweetQuestionComponent,
  ],
})
export class ComponentsModule { }
