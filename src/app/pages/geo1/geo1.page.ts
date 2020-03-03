import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NativeGeocoder,NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Map, tileLayer, marker} from 'leaflet';


@Component({
  selector: 'app-geo1',
  templateUrl: './geo1.page.html',
  styleUrls: ['./geo1.page.scss'],
})
export class Geo1Page implements OnInit {
  
  latitude: any = 0; 
  longitude: any = 0; 
  map: Map;
  lat: any = -15;
  long: any = -15;

  constructor(
    private geolocation: Geolocation
  ) {}

  options = {
    timeout: 10000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  };

  // use geolocation to get user's device coordinates
  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.lat = this.latitude;
      this.long = this.longitude;
      marker([this.latitude, this.longitude]).addTo(this.map)
      .bindPopup('Boo')
      .openPopup();
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }


  initMap() {
    this.map = new Map('mapId3').setView([this.lat, this.long], 23);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  ionViewDidEnter(){
    this.initMap();
  }
  ngOnInit(){}
}
