import { Component, OnInit } from '@angular/core';

/**
 * App component.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'my-app';

  /**
   * @ignore
   */
  constructor() { }

  /**
   * @ignore
   */
  ngOnInit() {}

}
