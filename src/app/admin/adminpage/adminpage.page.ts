import { Component, OnInit } from '@angular/core';

import { Tamu } from 'src/app/shared/bukutamuprop';
import { Router } from '@angular/router';

import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/shared/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.page.html',
  styleUrls: ['./adminpage.page.scss'],
})
export class AdminpagePage implements OnInit {
  
  Tamu: Tamu[];

  constructor(
    private router: Router,
    public _apiService: ApiService,
    private alertController: AlertController,
    public loadingController: LoadingController,
    private authService: AuthenticationService)
    {
      this.getTamu();
    }

  ngOnInit() {

  }

  logout(){
    this.alertController.create({
      header: 'Perhatian',
      subHeader: 'Yakin Logout aplikasi ?',
      buttons: [
        {
          text: 'Batal',
          handler: (data: any) => {
            console.log('Canceled', data);
          }
        },
        {
          text: 'Yakin',
          handler: (data: any) => {
            //jika tekan yakin
            this.authService.logout();
            this.router.navigateByUrl('/', { replaceUrl: true });
          }
        }
      ]
      }).then(res => {
        res.present();
      });
  }


  toEdit(id: number){
    this.router.navigate(['/edit', id.toString()]);
  }


  getTamu() {
    this._apiService.getTamu().subscribe((res: any) => {
      console.log("sukses", res);
      this.Tamu = res;
    }, (error: any) => {
      console.log("gagal", error);
      this.alertController.create({
        header: 'Notifikasi',
        message: 'Gagal memuat data tamu',
        buttons: ['OK']
      }).then(res => {
        res.present();
      })
    })
  }



  deleteTamu(id:number) {
    this.alertController.create({
      header: 'perhatian',
      subHeader: 'Yakin menghapus data ini?',
      buttons: [
        {
          text: 'Batal',
          handler: (data: any) => {
            console.log('dibatalkan', data);
          }
        },
        {
          text: 'Yakin',
          handler: (data: any) => {
            //jika tekan yakin
            this._apiService.deleteTamu(id.toString()).subscribe((res: any) => {
              console.log("sukses", res);
              this.getTamu();
            }, (error: any) => {
              console.log("error", error);
              this.alertController.create({
                header: 'Notifikasi',
                message: 'gagal memuat data tamu',
                buttons: ['OK']
              }).then(res => {
                res.present();
              })
            })
          }
        }
      ]
    }).then(res => {
      res.present();
    })
  }
}
