import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { authenticate } from '@state/actions/auth';

import electron from '@providers/electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Enigma Machine';

  constructor(private readonly store: Store<AppState>) { }

  ngOnInit() {
    const defaultHost = 'default';
    this.store.dispatch(authenticate({ username: defaultHost, password: defaultHost }));

    // if (electron) {
    //   electron.ipcRenderer.on('hostname', (event, hostname) => {
    //     this.store.dispatch(authenticate({ username: hostname, password: hostname }));
    //   });
    // }
  }
}
