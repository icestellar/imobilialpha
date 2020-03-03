import { Component, OnInit } from '@angular/core';
import { AuditService } from 'src/app/services/audit.service';
import { ActivatedRoute } from '@angular/router';
import { Audit } from 'src/app/interfaces/audit';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Map, tileLayer, marker} from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';

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

  constructor(
    private auditService: AuditService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private geolocation: Geolocation
  ) {
    this.auditId = this.activatedRoute.snapshot.params['id'];

    if (this.auditId) this.loadAudit();
  }
  options = {
    timeout: 10000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  };
  ngOnInit() { }

  ngOnDestroy() {
    if (this.auditSubscription) this.auditSubscription.unsubscribe();
  }
  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.lat = this.latitude;
      this.long = this.longitude;
      this.audit.longitude = this.longitude;
      this.audit.latitude = this.latitude;
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
