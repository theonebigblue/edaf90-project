import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import GpxParser, { Point } from 'gpxparser';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['../../../node_modules/leaflet/dist/leaflet.css', './map.component.css']
})

export class MapComponent implements OnInit, OnChanges {
  @Input() gpxData: GpxParser | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if(this.gpxData!==undefined){
      this.addGpxPath(this.gpxData);
    }
  }

  ngOnInit(): void {
    this.initMap();
  }

  public map: L.Map;
  public center: L.LatLngExpression = [55.722727014745416, 13.21390131868679]; // Kämnärsrätten
  public tracks: L.Polyline[] = [];

  private initMap(): void {
    this.map = L.map('map', {
      center: this.center,
      zoom: 12
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 10,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

public addGpxPath(gpxData: GpxParser){
  // go through metadata, track name, time etc and put in popup. then add every point to the track

  let polylines:L.Polyline[] = [];

  for (let index = 0; index < gpxData.tracks.length; index++) {
    const track = gpxData.tracks[index];
    const polyline = this.addPathFromPoints(track.points);

    polyline.bindPopup(`<p><b>Distance: </b>${Math.round(track.distance.total * 100)/100000} <b>Comment: </b>${track.cmt}</p>`).openPopup();


    polylines[index] = polyline;
    let numPaths = this.tracks.length;
    this.tracks[numPaths] = polyline;
    polyline.addTo(this.map);
  }
}

  /**
   * Adds a new paths from an array of points.
   * @param points Array of points.
   * @returns The ID of the added path.
   */
  private addPathFromPoints(points: Point[]): L.Polyline {
    var color;
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    color = "rgb("+r+" ,"+g+","+ b+")";

    let polyline :L.Polyline = L.polyline(points.map(point => [point.lat, point.lon]), {color: color, weight: 4});
    let numPaths = this.tracks.length;
    this.tracks[numPaths] = polyline;

    return polyline;
  }

  /**
   * Removes path of given ID
   * @param id ID number
   */
  public removePath(id: number): void {
    delete this.tracks[id];
  }

  /**
   * Get a path of given ID
   * @param id ID number
   * @returns Corresponding Polyline or undefined if non-existent
   */
  public getPath(id: number): L.Polyline | undefined {
    return this.tracks[id];
  }

}
