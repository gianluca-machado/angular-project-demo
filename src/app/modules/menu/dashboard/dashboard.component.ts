import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public companies: any[] = [
    {
      title: 'Mercado Livre',
      color: '#ffe600',
      logo: '',
    },
    {
      title: 'Shopee',
      color: '#ee4d30',
      logo: '',
    },
    {
      title: 'Magalu',
      color: '#0e87fe',
      logo: '',
    },
  ];
}
