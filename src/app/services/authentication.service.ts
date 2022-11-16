import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject } from 'rxjs';
const TOKEN_KEY = 'token-saya';
@Injectable({
 providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  constructor(private http:HttpClient) {
    this.loadToken();
  }

  async loadToken(){
    const token = await Preferences.get({ key: TOKEN_KEY });
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }
  apiURL() {
    return "http://localhost/api/";
  }
  
  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Preferences.remove({ key: TOKEN_KEY });
  }
}
