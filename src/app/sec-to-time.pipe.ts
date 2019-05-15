import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secToTime'
})
export class SecToTimePipe implements PipeTransform {

  padTime(t) {
    return t < 10 ? '0' + t : t;
  }

  transform(value: number): string {
      const hours = Math.floor(value / 3600),
        minutes = Math.floor((value % 3600) / 60),
        seconds = Math.floor(value % 60);

      return this.padTime(hours) + ':' + this.padTime(minutes) + ':' + this.padTime(seconds);
  }

}
