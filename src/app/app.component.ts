import { Component } from '@angular/core';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'order-admin';
  public currentUrl() {
    console.log('点击了');
    console.log(environment.baseUrl);
  }
}
