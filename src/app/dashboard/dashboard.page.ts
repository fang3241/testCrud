import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Preferences } from '@capacitor/preferences';
import { AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { Http } from "@capacitor-community/http";

const USERNAME = 'namasaya';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  // public nama='';
  namaTamu: string;

  // nama: any;

  constructor(
    private authService:AuthenticationService,
    private alertController:AlertController,
    private router:Router,
    private route: ActivatedRoute,
    public _apiService: ApiService,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    
  }

  // async cekSesi(){
  //   const ambilNama = await Preferences.get({ key: USERNAME});
  //   if(ambilNama && ambilNama.value){
  //     let namaUser = ambilNama.value;
  //     this.nama = namaUser;
  //   }
  // }

  toLogin(){
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }


  addTamu() {
    let url = this._apiService.apiURL() + "/tambah.php";
    Http.request({
      method: "POST",
      url: url,
      headers: { "Content-Type": "application/json" },
      data: {
        id_tamu: ''.trim(),
        nama: this.namaTamu.trim(),
      },
    }).then((data) => {
      this.namaTamu = '';
      this.alertController.create({
        header: 'Notifikasi',
        message: 'Berhasil Input data Tamu',
        buttons: ['OK'],
      }).then(res => {
        res.present();
      });
      // this.router.navigateByUrl('/mahasiswa');
    }, (error) => {
      console.log(error);
      this.alertController.create({
        header: 'Notifikasi',
        message: 'Gagal Input data Tamu',
        buttons: ['OK'],
      }).then(res => {
        res.present();
      });
    })
  }


}
