import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {PwcrackService} from '../../services/pwcrack.service';

@Component({
  selector: 'app-pwcrack',
  templateUrl: './pwcrack.component.html',
  styleUrls: ['./pwcrack.component.scss']
})
export class PwcrackComponent implements OnInit, OnDestroy {
  time = 1000;
  keys = 0;
  speed = '0';
  cpw = 'asdéfj3fdasp';
  hex1 = '';
  hex2 = '';
  hex3 = '';
  hex4 = '';
  hex5 = '';
  hex6 = '';
  hex7 = '';
  complated;

  TimerSubscription: Subscription;
  PassSubscription: Subscription;
  KeySubscription: Subscription;
  Hex1Subscription: Subscription;
  Hex2Subscription: Subscription;
  Hex3Subscription: Subscription;
  Hex4Subscription: Subscription;
  Hex5Subscription: Subscription;
  Hex6Subscription: Subscription;
  Hex7Subscription: Subscription;
  SpeedSubscription: Subscription;
  ComplateSubscription: Subscription;
  constructor(private pwcrackService: PwcrackService) {
  }

  ngOnInit() {
    this.TimerSubscription = this.pwcrackService.getTime().subscribe(t => {
      this.time = t;
    });
    this.KeySubscription = this.pwcrackService.getKeys().subscribe(k => {
      this.keys += Math.round(parseInt(this.speed, 0) / 1000);
    });
    this.SpeedSubscription = this.pwcrackService.getSpeedStream().subscribe(s => {
      this.speed = s.toFixed(2);
    });
    this.PassSubscription = this.pwcrackService.getPassStream().subscribe(p => {
      this.cpw = p;
    });
    this.Hex1Subscription = this.pwcrackService.getHexStream().subscribe(h => {
      this.hex1 = h;
    });
    this.Hex2Subscription = this.pwcrackService.getHexStream().subscribe(h => {
      this.hex2 = h;
    });
    this.Hex3Subscription = this.pwcrackService.getHexStream().subscribe(h => {
      this.hex3 = h;
    });
    this.Hex4Subscription = this.pwcrackService.getHexStream().subscribe(h => {
      this.hex4 = h;
    });
    this.Hex5Subscription = this.pwcrackService.getHexStream().subscribe(h => {
      this.hex5 = h;
    });
    this.Hex6Subscription = this.pwcrackService.getHexStream().subscribe(h => {
      this.hex6 = h;
    });
    this.Hex7Subscription = this.pwcrackService.getHexStream().subscribe(h => {
      this.hex7 = h;
    });

    this.ComplateSubscription = this.pwcrackService.isComplate().subscribe(c => {
      this.complated = c;
      this.stop();
    });

  }

  stop() {
    this.TimerSubscription.unsubscribe();
    this.PassSubscription.unsubscribe();
    this.KeySubscription.unsubscribe();
    this.Hex1Subscription.unsubscribe();
    this.Hex2Subscription.unsubscribe();
    this.Hex3Subscription.unsubscribe();
    this.Hex4Subscription.unsubscribe();
    this.Hex5Subscription.unsubscribe();
    this.Hex6Subscription.unsubscribe();
    this.Hex7Subscription.unsubscribe();
    this.SpeedSubscription.unsubscribe();
  }

  ngOnDestroy() {
    this.TimerSubscription.unsubscribe();
    this.PassSubscription.unsubscribe();
    this.KeySubscription.unsubscribe();
    this.Hex1Subscription.unsubscribe();
    this.Hex2Subscription.unsubscribe();
    this.Hex3Subscription.unsubscribe();
    this.Hex4Subscription.unsubscribe();
    this.Hex5Subscription.unsubscribe();
    this.Hex6Subscription.unsubscribe();
    this.Hex7Subscription.unsubscribe();
    this.SpeedSubscription.unsubscribe();
    this.ComplateSubscription.unsubscribe();
  }

}
