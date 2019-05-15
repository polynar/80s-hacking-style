import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { TerminalComponent } from './components/terminal/terminal.component';
import { FormsModule } from '@angular/forms';
import { BootComponent } from './components/boot/boot.component';
import {FortuneService} from './services/fortune.service';
import {BullshitService} from './services/bullshit.service';
import {JokeService} from './services/joke.service';
import { PwcrackComponent } from './components/pwcrack/pwcrack.component';
import { SecToTimePipe } from './sec-to-time.pipe';
import { VideoplayerComponent } from './components/videoplayer/videoplayer.component';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { LoginComponent } from './components/login/login.component';
import {AngularFireDatabaseModule} from '@angular/fire/database';

import { AuthService } from './services/auth.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    TerminalComponent,
    BootComponent,
    PwcrackComponent,
    SecToTimePipe,
    VideoplayerComponent,
    LoginComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    PerfectScrollbarModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  providers: [
    FortuneService,
    BullshitService,
    JokeService,
    AuthService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
