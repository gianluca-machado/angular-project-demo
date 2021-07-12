import { Component, OnInit } from '@angular/core';
import { LanguageService } from './services/language.service';
import { ThemeService } from './services/theme.service';

/**
 * App component.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ecommerce-integrator-system';

  constructor(
    private themeService: ThemeService,
    private languageService: LanguageService,
  ) { }

  ngOnInit() {
    this.themeService.setDefaultTheme();
    this.languageService.setDefaultLanguage();
  }
}
