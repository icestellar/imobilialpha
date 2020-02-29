import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker, L} from 'leaflet';


@Component({
  selector: 'app-geo',
  templateUrl: './geo.page.html',
  styleUrls: ['./geo.page.scss'],
})
export class GeoPage implements OnInit {
  map: Map;

  constructor() { }
  
  ionViewDidEnter() { 
    this.leafletMap(); 
  }

  leafletMap() {
    // In setView add latLng and zoom
    this.map = new Map('mapId3').setView([28.644800, 77.216721], 10);
    tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'edupala.com © ionic LeafLet',
    }).addTo(this.map);


    marker([28.6, 77]).addTo(this.map)
      .bindPopup('Boo')
      .openPopup();
      
  }

  /** Remove map when we have multiple map object */
  ionViewWillLeave() {
    this.map.remove();
  }
  ngOnInit(){

  }
}
