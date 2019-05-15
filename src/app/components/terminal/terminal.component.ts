import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {FortuneService} from '../../services/fortune.service';
import {Subscription} from 'rxjs';
import {BullshitService} from '../../services/bullshit.service';
import {AppComponent} from '../../app.component';
@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('term') term: ElementRef;
  @ViewChild('termInput') termInput: ElementRef;
  @Output() someEvent = new EventEmitter<string>();

  FortuneSubscription: Subscription;
  BullshitSubscription: Subscription;

  welcomeText = 'PolynarCorp&#8482; terminal v2.4 is ready for operation.\n\n' +
      'Type \'help\' for a list of available commands.\n' +
      'Type \'help  &#60;command&#62;\' for details of individual commands.\n' +
      '\nUse Up&#9650; and Down&#9660; arrows to navigate in command history.\n' +
      '\nType \'exit\' to go back\n\n';
  termBuffer = this.welcomeText;
  lineBuffer = '';
  cwd = '~/';
  tags = ['red', 'blue', 'white', 'bold'];
  maxBufferLength = 8192;
  commandHistory = [];
  currentCommandIndex = -1;
  maxCommandHistory = 100;
  autoFocus = true;
  bell;
  ob = '';
  diff;

  fortunes;
  bullshit;

  static isInputKey(keyCode) {
    const inputKeyMap = [32, 190, 192, 189, 187, 220, 221, 219, 222, 186, 188, 191];
    return inputKeyMap.indexOf(keyCode) > -1;
  }

  constructor(
      private bullshitService: BullshitService,
      private renderer: Renderer2,
      private location: Location,
      private router: Router,
      private fortuneService: FortuneService,
      private appComponent: AppComponent) {}

  ngOnInit() {
    this.FortuneSubscription = this.fortuneService.getFortunes().subscribe((data) => {
      this.fortunes = data;
    }, error => {
      console.log(error);
    });

    this.BullshitSubscription = this.bullshitService.getBullshit().subscribe((data) => {
       this.bullshit = data;
    });

  }

  ngAfterViewInit() {
    if ( this.autoFocus ) {
      this.termInput.nativeElement.focus();
    }
    this.renderTerm();
  }

  clickOnTerminal() {
    this.termInput.nativeElement.focus();
    this.term.nativeElement.classList.add('terminal-focus');
  }

  textAreaBlur() {
    this.term.nativeElement.classList.remove('terminal-focus');
  }

  help(argv, argc): string {
    if (argv[1]) {
      switch (argv[1]) {
        case 'clear':
          return '\nThe clear command clears the screen\n\n';

        case 'exit':
          return '\nThe exit command return back to main screen\n\n';

        case 'fortune':
          return '\nGive a random fortune\n\n';

        case 'welcome':
          return '\nPrint welcome text to terminal if you need it after one clear command\n\n';

        case 'bullshit':
          return '\nGive a random generated bullshit to you\n\n';

        default:
          return '\nCommand ' + argv[1] + ' not found\n\n';
      }
    }
    return '\nclear - Clear the terminal screen\n' +
        'exit - Navigate back to main screen\n' +
        'fortune - Give a random fortune\n' +
        'bullshit - Give a random bullshit\n' +
        'welcome - Print welcome text to terminal\n' +
        'shutdown - Turn off the system\n\n';
  }

  processLine() {

    let stdout;
    const line = this.lineBuffer;
    const argv = line.split(' ');
    const argc = argv.length;

    const cmd = argv[0];

    this.lineBuffer += '\n';
    this.writeToBuffer( this.getLeader() + this.lineBuffer );
    this.lineBuffer = '';

    if ( cmd !== '' ) {


      switch (cmd) {
        case 'clear':
          stdout = this.clear();
          break;
        case 'exit':
          stdout = this.exit();
          break;
        case 'help':
          stdout = this.help(argv, argc);
          break;
        case 'love':
          stdout = this.love();
          break;
        case 'fortune':
          stdout = this.fortune();
          break;
        case 'welcome':
          stdout = '\n' + this.welcomeText;
          break;
        case 'shutdown':
          stdout = this.shutdown();
          break;
        case 'bullshit':
          this.BullshitSubscription = this.bullshitService.getBullshit().subscribe((data) => {
            this.bullshit = data;
          });
          stdout = '\n' + this.bullshit['phrase'] + '\n\n';
          break;
          // case 'yosay':
            // stdout = this.yosay(argv, argc);
            // break;
        default:
          stdout = '';
      }

      if ( stdout === '' && cmd !== 'clear' ) {
        stdout = '\n{white}{bold}' + cmd + '{/bold}{/white}: command not found\n\n';
      }

      stdout = this.renderStdOut(stdout);
      this.writeToBuffer(stdout);

      this.addLineToHistory(line);

    }
    this.renderTerm();
  }

  clear(): string {
    this.termBuffer = '';
    return '';
  }

  exit(): string {
    this.router.navigateByUrl('/');
    return '';
  }

  fortune() {
    return '\n' + this.fortunes[Math.floor(Math.random() * this.fortunes.length)] + '\n\n';
  }

  private love() {
    return '\n&#9829;&#9829;&#9829;&#9829;&#9829;&#9829;&#9829;&#9829;&#9829;&#9829;&#9829;&#9829;&#9829;&#9829;&#9829;&#9829;\n' +
        '&#9829;              &#9829;\n' +
        '&#9829; I &#9829; Angular! &#9829;\n' +
        '&#9829;              &#9829;\n' +
        '&#9829;&#9829;&#9829;&#9829;&#9829;&#9829;&#9829;&#9829;&#9829;&#9829;&#9829;&#9829;&#9829;&#9829;&#9829;&#9829;\n\n';
  }

  getLeader() {
    return this.cwd + '$ ';
  }

  shutdown() {
    this.appComponent.turnOff();
    return '';
  }

  renderTerm(): void {
    this.bell = this.renderer.createElement('span');
    this.bell.classList.add('blinking-cursor');
    const bellText = this.renderer.createText('_');
    this.renderer.appendChild(this.bell, bellText);
    this.ob = this.termBuffer + this.getLeader() + this.lineBuffer;
    this.term.nativeElement.innerHTML = this.ob;
    this.renderer.appendChild(this.term.nativeElement, this.bell);
    this.term.nativeElement.scrollTop = this.term.nativeElement.scrollHeight;
  }

  writeToBuffer(str) {
    this.termBuffer += str;

    // Stop the buffer getting massive.
    if ( this.termBuffer.length > this.maxBufferLength ) {
      this.diff = this.termBuffer.length - this.maxBufferLength;
      this.termBuffer = this.termBuffer.substr(this.diff);
    }

  }


  renderStdOut(str: string) {
    let i = 0;
    const max = this.tags.length;
    for ( i; i < max; i++ ) {
      const start = new RegExp('{' + this.tags[i] + '}', 'g');
      const end = new RegExp('{/' + this.tags[i] + '}', 'g');
      str = str.replace(start, '<span class="' + this.tags[i] + '">');
      str = str.replace(end, '</span>');
    }
    return str;
  }

  addLineToHistory(line) {
    this.commandHistory.unshift( line );
    this.currentCommandIndex = -1;
    if ( this.commandHistory.length > this.maxCommandHistory ) {

      this.diff = this.commandHistory.length - this.maxCommandHistory;
      this.commandHistory.splice(this.commandHistory.length - 1, this.diff);

    }
  }

  toggleCommandHistory(direction) {

    // const max = this.commandHistory.length - 1;
    let newIndex = this.currentCommandIndex + direction;

    if ( newIndex < -1 ) { newIndex = -1; }
    if ( newIndex >= this.commandHistory.length) { newIndex = this.commandHistory.length - 1; }

    if ( newIndex !== this.currentCommandIndex ) {
      this.currentCommandIndex = newIndex;
    }

    if ( newIndex > -1 ) {
      // Change line to something from history.
      this.lineBuffer = this.commandHistory[newIndex];
    } else {
      // Blank line...
      this.lineBuffer = '';
    }


  }

  acceptInput(e) {
    e.preventDefault();

    this.termInput.nativeElement.value = '';

    if ( e.keyCode >= 48 && e.keyCode <= 90 || TerminalComponent.isInputKey(e.keyCode) ) {
      if (! e.ctrlKey ) {
        // Character input
        this.lineBuffer += e.key.toLowerCase();
      } else {
        // Hot key input? I.e Ctrl+C
      }
    } else if ( e.keyCode === 13 ) {
      this.processLine();
    } else if ( e.keyCode === 9 ) {
      this.lineBuffer += '\t';
    } else if ( e.keyCode === 38 ) {
      this.toggleCommandHistory(1);
    } else if ( e.keyCode === 40 ) {
      this.toggleCommandHistory(-1);
    } else if ( e.key === 'Backspace' ) {
      this.lineBuffer = this.lineBuffer.substr(0, this.lineBuffer.length - 1);
    }

    this.renderTerm();
  }

  ngOnDestroy() {
    this.BullshitSubscription.unsubscribe();
    this.FortuneSubscription.unsubscribe();
  }
}
