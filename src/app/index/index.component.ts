import {Component, OnInit} from '@angular/core';
import {GpxService} from "../gpx.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  public ids: string[] | undefined;
  constructor(
      public gpxService: GpxService
    ) {}

  ngOnInit(): void {
    this.gpxService.getIds().then(
        data => this.ids = data
    );
  }

}
