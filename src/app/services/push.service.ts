import { Injectable } from '@angular/core';
import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private oneSignal:OneSignal) { 
              }

  configuracionInicial(){
    this.oneSignal.startInit('7c11a8f6-b69a-4662-95e8-f97815ca7f44','ZmEzNzRiMzUtOTA3Yy00M2RjLTkwOTctM2I4ZWI3MGI3MzA1');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    
    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
     // do something when notification is received
     console.log('Notificación recibida', noti);
    });
    
    this.oneSignal.handleNotificationOpened().subscribe((noti) => {
      // do something when a notification is opened
      console.log('Notificación abierta', noti);
    });
    
    this.oneSignal.endInit();
  }
}
