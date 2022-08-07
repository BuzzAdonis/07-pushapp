import { ApplicationRef, Component, OnInit } from '@angular/core';
import OSNotification from 'onesignal-cordova-plugin/dist/OSNotification';
import { PushService } from '../services/push.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  mensajes: OSNotification[]=[];
  constructor(public pushServices:PushService,
              private applicationRef:ApplicationRef,
    ) {}
  ngOnInit(){
    this.pushServices.pushListener.subscribe(noti =>{
      this.mensajes.unshift(noti);
      this.applicationRef.tick();
    });
  }
 async ionViewWillEnter(){
  this.mensajes = await this.pushServices.getMesajes();
  }
 async borrarMensaje(){
  await  this.pushServices.borrarMensajes();
  this.mensajes=[];
  }
}
