import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BullshitService {

  constructor(private httpClient: HttpClient) { }

  getBullshit() {
    return this.httpClient.get('https://corporatebs-generator.sameerkumar.website/');
  }
}
