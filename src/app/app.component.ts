import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { PushService } from './services/push.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
   private platform: Platform,
   private pushServices:PushService
  ) {
    this.inicialazeApp();
  }
  inicialazeApp(){
    this.platform.ready().then(() => {
     this.pushServices.configuracionInicial();
    });
  }
}
