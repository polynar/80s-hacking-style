import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TerminalComponent} from './components/terminal/terminal.component';
import {AppComponent} from './app.component';
import {BootComponent} from './components/boot/boot.component';
import {PwcrackComponent} from './components/pwcrack/pwcrack.component';
import {VideoplayerComponent} from './components/videoplayer/videoplayer.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: BootComponent },
  { path: 'boot', component: BootComponent },
  { path: 'terminal', component: TerminalComponent },
  { path: 'pwcrack', component: PwcrackComponent },
  { path: 'videoplayer', component: VideoplayerComponent },
  { path: '**', component: AppComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
