import { Component, OnInit } from '@angular/core';

import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public constructor(private readonly service: ApiService) { }

  public ngOnInit() {

  }
}
