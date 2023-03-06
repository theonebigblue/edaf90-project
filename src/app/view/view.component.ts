import {Component, OnInit} from '@angular/core';
import GpxParser from 'gpxparser';
import {GpxService} from "../gpx.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  public gpxObject: GpxParser | undefined;
  constructor(
      public gpxService: GpxService,
      public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.gpxService.getDocFromId(this.route.snapshot.url[1].path).then(
        data => {
          this.gpxObject = data
          console.log(this.gpxObject)
        }
    )
  }

}
