import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { PushService } from './services/push.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  {
  constructor(
   private platform: Platform,
   private pushServices:PushService,
   private storage: Storage
  ) {
    this.inicialazeApp();
  }
 async inicialazeApp(){
    this.platform.ready().then(() => {
    this.pushServices.configuracionInicial();
    this.storage.create();
    });
  }

}
