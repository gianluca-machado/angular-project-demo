import { Component, OnInit } from '@angular/core';
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
  ) {}

  ngOnInit() {
    this.themeService.setDefaultTheme();
  }
}
