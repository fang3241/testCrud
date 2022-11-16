import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public http: HttpClient,
  ) {

  }

  //link API
  apiURL() {
    return "http://localhost/api";
  }

  getTamu() {
    return this.http.get(this.apiURL() + '/tampil.php');
  }

  deleteTamu(id:any) {
    return this.http.delete(this.apiURL() + '/hapus.php?id_tamu=' + id);
  }

  ambilTamu(id:any) {
    return this.http.get(this.apiURL() + '/lihat.php?id_tamu=' + id);
  }


}
