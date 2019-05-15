import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FortuneService {

  constructor(private httpClient: HttpClient) {

  }

  getFortunes() {
    return this.httpClient.get('assets/data/fortune-cookie.json');
  }

}
