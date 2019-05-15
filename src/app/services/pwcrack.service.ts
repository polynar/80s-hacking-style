import { Injectable } from '@angular/core';
import {delay, mapTo, repeat, switchMap} from 'rxjs/operators';
import {BehaviorSubject, interval, of, timer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PwcrackService {
  randomHex$ = of('').pipe(
     switchMap(() => timer(130).pipe(mapTo(this.getRandomHex(32))
     ))
  ).pipe(repeat());

  randomPass$ = of('').pipe(
    switchMap(() => timer(this.getRandomArbitrary(140, 159)).pipe(mapTo(this.getRandomPass(10))
    ))
  ).pipe(repeat());

  randomSpeed$ = of('').pipe(
    switchMap(() => timer(130).pipe(
      mapTo(this.getRandomArbitrary(1400, 1599))
    ))
  ).pipe(repeat());

  source$ = timer(1, 1000);
  keys$ = interval(1);
  private theBoolean: BehaviorSubject<boolean>;

  constructor() {
    this.theBoolean = new BehaviorSubject<boolean>(true);
  }

  isComplate() {
    return this.theBoolean.asObservable().pipe(delay(10000));
  }

  getTime() {
    return this.source$;
  }

  getKeys() {
    return this.keys$;
  }

  getHexStream() {
    return this.randomHex$;
  }

  getPassStream() {
    return this.randomPass$;
  }

  getSpeedStream() {
    return this.randomSpeed$;
  }

  getRandomPass(len) {
    let i, out = '';
    const all = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (i = 0; i < len; i++) {
      out += all.charAt(Math.floor(Math.random() * all.length));
    }
    return out;
  }

  getRandomHex(len) {
    if (len % 2 === 1) {
      len += 1;
    }
    let i, out = '';
    const hex = 'ABCDEF0123456789';
    for (i = 1; i <= len; i++) {
      out += hex.charAt(Math.floor(Math.random() * hex.length));
      if (i % 2 === 0) {
        out += ' ';
      }
    }
    return out;
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
}
