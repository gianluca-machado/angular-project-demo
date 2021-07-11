// modules
import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// config angular i18n
import pt from '@angular/common/locales/pt';

// config ng-zorro-antd i18n
import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';

// icons
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

// see documentation: https://ng.ant.design/components/spin/en
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { ComponentsModule } from '../components/components.module';

registerLocaleData(pt);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map((key) => antDesignIcons[key]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    NzIconModule,
    NzLayoutModule,
    NzFormModule,
    NzInputModule,
    NzMenuModule,
    NzButtonModule,
    NzCheckboxModule,
    NzListModule,
    NzMessageModule,
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    NzIconModule,
    NzLayoutModule,
    NzFormModule,
    NzInputModule,
    NzMenuModule,
    NzButtonModule,
    NzCheckboxModule,
    NzListModule,
    NzMessageModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: NZ_I18N, useValue: pt_BR },
    { provide: NZ_ICONS, useValue: icons },
  ],
})
export class SharedModule { }
