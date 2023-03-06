import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import Chart from "chart.js/auto";
import GpxParser from "gpxparser";

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.css"],
})
export class TimelineComponent implements OnInit, OnChanges {
  public timeline: Chart;
  nbrOfKilometers: number[] = [];
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
      let prevPoint = points[0];
      let prevTime = points[0].time;
      points.forEach(point => {
        //At the moment there is no plotting of the last kilometer
        distance += this.getDistanceFromLatLonInKm(prevPoint.lat, prevPoint.lon, point.lat, point.lon);
        prevPoint = point;
        if (distance > 1) {
          this.data.push(point.time.getMinutes() - prevTime.getMinutes());
          prevTime = point.time;
          distance = 0;
        }
      })

      this.nbrOfKilometers = [...Array(Math.round(track.distance.total / 1000)).keys()]
      console.log(track.distance.total);
    }
    this.timeline.data.labels = this.nbrOfKilometers;
    this.timeline.update()
    console.log(this.nbrOfKilometers)

  }

   private getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // this.deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  private deg2rad(deg: number) {
    return deg * (Math.PI/180)
  }

  private createChart(): void {

    this.timeline = new Chart("timeline", {
      type: "line", //this denotes tha type of chart
     
      data: {
  
        labels: this.nbrOfKilometers,
        datasets: [
          {
            label: "Velocity",
  
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
