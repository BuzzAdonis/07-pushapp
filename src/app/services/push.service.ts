import { EventEmitter, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import OneSignal from 'onesignal-cordova-plugin';
import OSNotification from 'onesignal-cordova-plugin/dist/OSNotification';
@Injectable({
  providedIn: 'root'
})
export class PushService {
 mensajes: OSNotification[]=[];
 userId:string;
 pushListener = new EventEmitter<OSNotification>();
  constructor(private storage:Storage
  ) {
    this.cargarMesajes();
  }
 async getMesajes(){
   await this.cargarMesajes();
   return [...this.mensajes];
  }
  configuracionInicial(){
      // Uncomment to set OneSignal device logging to VERBOSE  
      // OneSignal.setLogLevel(6, 0);
    
      // NOTE: Update the setAppId value below with your OneSignal AppId.
      OneSignal.setAppId("7c11a8f6-b69a-4662-95e8-f97815ca7f44");
      OneSignal.setNotificationWillShowInForegroundHandler(jsonData=>{
        this.notificacionRecivida(jsonData.getNotification());
      });
      OneSignal.setNotificationOpenedHandler(async jsonData => {
        await this.notificacionRecivida(jsonData.notification);
      });
    
      // iOS - Prompts the user for notification permissions.
      //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 6) to better communicate to your users what notifications they will get.
      OneSignal.promptForPushNotificationsWithUserResponse(accepted => {
          console.log("User accepted notifications: " + accepted);
      });
     OneSignal.getDeviceState((state) => {
        this.userId=state.userId;
      });
    }

  async  notificacionRecivida(payload:OSNotification){
      await this.cargarMesajes();
      console.log(payload);
      const existePush = this.mensajes.find(mensajes => mensajes.notificationId === payload.notificationId);
      if(existePush){
        return;
      }
      this.mensajes.unshift(payload);
      this.pushListener.emit(payload);
      await this.guardarMensajes();
    }
    async guardarMensajes(){
     await this.storage.set('mensajes', this.mensajes);
    }
  async  cargarMesajes(){
      this.mensajes = await this.storage.get('mensajes') || [];
      return this.mensajes;
    }
   async borrarMensajes(){
   await this.storage.clear();
    this.mensajes=[];
    this.guardarMensajes();
    }
}
