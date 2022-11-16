import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  namaTamu: string;

  constructor(
    private toastCtrl: ToastController
  ) {}


  // async addTamu(){
  //   console.log(this.namaTamu);
  //   const toast = await this.toastCtrl.create({
  //     message: 'Tamu Terdaftar',
  //     duration: 2000
  //   }).then(() = {
  //     this.namaTamu = '';
  //   }
  //   );
  //   toast.present();
  // }

  addTamu(){
    console.log(this.namaTamu);
  }
}
