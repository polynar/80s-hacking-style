import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class JokeService {
  firstName;

  constructor(private userService: UserService, private httpClient: HttpClient) {
    this.firstName = this.userService.firstName;
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
