import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";
import { ApiService } from '../../shared/api.service';
import { Http } from "@capacitor-community/http";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  id: string;
  id_tamu: number;
  namaTamu: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _apiService: ApiService,
    private alertController: AlertController,
    public LoadingController: LoadingController,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.ambilTamu(this.id);
   }

  ngOnInit() {
  }

  ambilTamu(id: any) {
    this._apiService.ambilTamu(id).subscribe((res: any) => {
      console.log('sukses', res);
      let tamu = res;
      //console.log(mahasiswa);
      this.id_tamu = tamu.id_tamu;
      this.namaTamu = tamu.nama;
    }, (error: any) => {
      console.log('error', error);
      alert('gagal ambil data');
    })
  }


  editTamu() {
    let url = this._apiService.apiURL() + "/edit.php";
    Http.request({
      method: "POST",
      url: url,
      headers: { "Content-Type": "application/json" },
      data: {
        id_tamu: this.id_tamu,
        nama: this.namaTamu,
      },
    }).then((data) => {
      this.alertController.create({
        header: 'Notifikasi',
        message: 'Berhasil Edit Data Tamu',
        buttons: ['OK'],
      }).then(res => {
        res.present();
      });
      this.router.navigateByUrl('/adminpage');
    }, (err) => {
      console.log(err);
      this.alertController.create({
        header: 'Notifikasi',
        message: 'Gagal Edit Data Tamu',
        buttons: ['OK']
      }).then(res => {
        res.present()
      });
      this.router.navigateByUrl('/adminpage');
    })
  }

}
