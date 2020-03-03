import { Component, OnInit } from '@angular/core';
import { AuditService } from 'src/app/services/audit.service';
import { ActivatedRoute } from '@angular/router';
import { Audit } from 'src/app/interfaces/audit';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Map, tileLayer, marker} from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
 

@Component({
  selector: 'app-auditdtl',
  templateUrl: './auditdtl.page.html',
  styleUrls: ['./auditdtl.page.scss'],
})
export class AuditdtlPage implements OnInit {
  private auditId: string = null;
  public audit: Audit = {};
  private loading: any;
  private auditSubscription: Subscription;
  latitude: any = 0; 
  longitude: any = 0; 
  map: Map;
  lat: any = -15;
  long: any = -15;
  locationCoords: any;
  timetest: any;

  constructor(
    private auditService: AuditService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private geolocation: Geolocation,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy
  ) {
    this.locationCoords = {
      latitude: "",
      longitude: "",
      accuracy: "",
      timestamp: ""
    }
    this.timetest = Date.now();
    this.auditId = this.activatedRoute.snapshot.params['id'];

    if (this.auditId) this.loadAudit();
  }
  options = {
    timeout: 30000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  };
  ngOnInit() { }

  ngOnDestroy() {
    if (this.auditSubscription) this.auditSubscription.unsubscribe();
  }
  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
 
          //If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {
 
          //If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }
 
  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error)
            }
          );
      }
    });
  }
 
  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        this.getCurrentCoordinates()
      },
      error => alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }
  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition({ timeout: 30000 }).then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.lat = this.latitude;
      this.long = this.longitude;
      this.audit.longitude = this.longitude;
      this.audit.latitude = this.latitude;
      marker([this.latitude, this.longitude]).addTo(this.map)
      .bindPopup('Aqui!')
      .openPopup();
      this.map.setView([this.latitude, this.longitude],23)
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
  loadAudit() {
    this.auditSubscription = this.auditService.getAudit(this.auditId).subscribe(data => {
      this.audit = data;
    });
  }

  async saveAudit() {
    await this.presentLoading();

    this.audit.userId = this.authService.getAuth().currentUser.uid;

    if (this.auditId) {
      try {
        await this.auditService.updateAudit(this.auditId, this.audit);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/audit');
      } catch (error) {
        
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      this.audit.createdAt = new Date().getTime();

      try {
        await this.auditService.addAudit(this.audit);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/audit');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
  

}
