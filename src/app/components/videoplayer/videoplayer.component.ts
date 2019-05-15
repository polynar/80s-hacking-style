import {AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';


@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.scss']
})
export class VideoplayerComponent implements OnInit, AfterContentInit, AfterViewInit {
  @ViewChild('video') video: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('seekbar') seekbar: ElementRef;
  button = 'play';
  time = '-:--:--';

  constructor() { }

  ngOnInit() {
    this.seekbar.nativeElement.value = 0;
    this.seekbar.nativeElement.min = 0;
    this.seekbar.nativeElement.max = 100;
    this.video.nativeElement.addEventListener('timeupdate', () => {
      this.updateTheTime();
    });
  }

  ngAfterContentInit() {

  }

  ngAfterViewInit(): void {

  }

  playpause() {
    if ( this.video.nativeElement.paused ) {
      this.play();
      this.button = 'pause';
    } else {
      this.pause();
      this.button = 'play';
    }
  }

  play() {
    this.video.nativeElement.play();
  }

  pause() {
    this.video.nativeElement.pause();
  }

  changeTheTime() {
    this.video.nativeElement.currentTime =
      this.video.nativeElement.duration * this.seekbar.nativeElement.value / this.seekbar.nativeElement.max;
  }

  updateTheTime() {
    let sec = this.video.nativeElement.currentTime;
    const h = Math.floor(sec / 3600);
    sec = sec % 3600;
    const min = Math.floor(sec / 60);
    sec = Math.floor(sec % 60);
    let min2;
    if (sec.toString().length < 2) { sec = '0' + sec; }
    if (min.toString().length < 2) { min2 = '0' + min; }
    this.time = h + ':' + min2 + ':' + sec;

      this.seekbar.nativeElement.value =
        this.video.nativeElement.currentTime / this.video.nativeElement.duration * this.seekbar.nativeElement.max;
  }

}
