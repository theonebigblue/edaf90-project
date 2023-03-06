import { provideCloudinaryLoader } from "@angular/common";
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import Chart from "chart.js/auto";
import GpxParser from "gpxparser";
import { last } from "rxjs";

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.css"],
})
export class TimelineComponent implements OnInit, OnChanges {
  public timeline: Chart;
  nbrOfKilometers: number[] = [];
  wholeKm: number = 0;
  data: number[] = [];
  @Input() gpxData: GpxParser | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.gpxData !== undefined) {
      this.addGpxPath(this.gpxData);
    }
    const track = this.gpxData?.tracks[0];
    const points = track?.points;
    let distance = 0;
    if (points) {
      this.data.push(0); //Add starting velocity = 0.
      let prevPoint = points[0];
      let prevTime = points[0].time;
      points.forEach((point) => {
        distance += this.getDistanceFromLatLonInKm(
          prevPoint.lat,
          prevPoint.lon,
          point.lat,
          point.lon
        );
        prevPoint = point;

        if (distance > 1) {
          this.wholeKm++;
          this.data.push(Math.round((point.time.getTime() - prevTime.getTime())/60000));
          this.nbrOfKilometers.push(this.wholeKm);
          prevTime = point.time;
          distance = 0;
        }
      });
      let lastKmStringFormat = (track.distance.total / 1000).toFixed(2);
      this.nbrOfKilometers.push(parseFloat(lastKmStringFormat));
      this.data.push(
          Math.round((points[points.length - 1].time.getTime() - prevTime.getTime())/60000)
      );
    }
    if (this.timeline) {
      this.timeline.data.labels = this.nbrOfKilometers;
      this.timeline.update();
    }

  }

  private getDistanceFromLatLonInKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1); // this.deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  private deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  private createChart(): void {
    this.timeline = new Chart("timeline", {
      type: "line", //this denotes tha type of chart

      data: {
        labels: this.nbrOfKilometers,
        datasets: [
          {
            label: "Minutes/km",

            data: this.data,
            backgroundColor: "turquoise",
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  ngOnInit(): void {
    this.createChart();
  }

  public addGpxPath(gpxData: GpxParser) {
    // go through metadata, track name, time etc and put in popup. then add every point to the track

    for (let index = 0; index < gpxData.tracks.length; index++) {
      const track = gpxData.tracks[index];
    }
  }
}
