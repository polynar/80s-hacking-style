import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class JokeService {
  firstName;

  constructor(private authService: AuthService, private httpClient: HttpClient) {
    // this.firstName = this.authService.user.name;
  }

  getJoke() {
    if (this.firstName !== null) {
      return this.httpClient.get('http://api.icndb.com/jokes/random?firstName=' + this.firstName);
    } else {
      return this.httpClient.get('http://api.icndb.com/jokes/random');
    }
  }

  // http://api.icndb.com/jokes/random?firstName=John&amp;lastName=Doe
}
