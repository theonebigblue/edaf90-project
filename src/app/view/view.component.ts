import {Component, OnInit} from '@angular/core';
import GpxParser from 'gpxparser';
import {GpxService} from "../gpx.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  public gpxObject: GpxParser | undefined;
  
  constructor(
      public gpxService: GpxService
  ) {}

  ngOnInit(): void {
    console.log("I init")
    // TODO: Replace the static id with id from url
    this.gpxService.getDocFromId('workout-2022-06-08_15-11-Bl_').then(
        data => {
          this.gpxObject = data
          console.log(this.gpxObject)
        }
    )
  }

}