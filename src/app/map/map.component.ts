import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  ngOnInit(): void {
    this.initMap();
    var latlngs: [number, number][] = [
      [55.722727014745416, 13.21390131868679],
      [55.722719016402856, 13.213821399388207],
      [55.72302346850292,13.213701373737045]
    ];
    this.addPathFromPoints(latlngs);
  }

  private map: L.Map;
  private center: L.LatLngExpression = [55.722727014745416, 13.21390131868679]; // Kämnärsrätten
  private paths: L.Polyline[] = [];

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

  /**
   * Adds a new paths from an array of points.
   * @param points Array of points.
   * @returns The ID of the added path.
   */
  public addPathFromPoints(points: [number, number][]): number {
    let polyline :L.Polyline = L.polyline(points, {color: 'red'}).addTo(this.map);
    let numPaths = this.paths.length;
    this.paths[numPaths] = polyline;
    return numPaths;
  }

  /**
   * Removes path of given ID
   * @param id ID number
   */
  public removePath(id: number): void {
    delete this.paths[id];
  }

  /**
   * Get a path of given ID
   * @param id ID number
   * @returns Corresponding Polyline or undefined if non-existent
   */
  public getPath(id: number): L.Polyline | undefined {
    return this.paths[id];
  }

}
