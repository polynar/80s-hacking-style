import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _firstName;

  constructor() { }


  get firstName() {
    return this._firstName;
  }

  set firstName(value) {
    this._firstName = value;
  }
}
