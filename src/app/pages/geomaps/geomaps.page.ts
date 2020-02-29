import { Component, OnInit} from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { GoogleMaps, GoogleMapsEvent, LatLng, MarkerOptions, Marker } from '@ionic-native/google-maps';


@Component({
  selector: 'app-geomaps',
  templateUrl: './geomaps.page.html',
  styleUrls: ['./geomaps.page.scss'],
})
export class GeomapsPage {
  constructor( public platform: Platform, public nav: NavController ) {

	}

	ngAfterViewInit() {

		this.platform.ready().then( () => {

			this.loadMap();
		});
  }
  loadMap() {

    let map = GoogleMaps.create( 'map' );
  
    map.one( GoogleMapsEvent.MAP_READY ).then( ( data: any ) => {
  
      let coordinates: LatLng = new LatLng( 36.7783, 119.4179 );
  
      let position = {
        target: coordinates,
        zoom: 14
      };
  
      map.animateCamera( position );
  
      let markerOptions: MarkerOptions = {
        position: coordinates,
        icon: "assets/images/marker.png",
        title: 'Hello California'
      };
  
      const marker = map.addMarker( markerOptions )
      .then( ( marker: Marker ) => {
        marker.showInfoWindow();
      });
    })
  }

}
