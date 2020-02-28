import { Component, OnInit } from '@angular/core';
import { ApartmentService } from 'src/app/services/apartment.service';
import { ActivatedRoute } from '@angular/router';
import { Apartment } from 'src/app/interfaces/apartment';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  private apartmentId: string = null;
  public apartment: Apartment = {};
  private loading: any;
  private apartmentSubscription: Subscription;

  constructor(
    private apartmentService: ApartmentService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.apartmentId = this.activatedRoute.snapshot.params['id'];

    if (this.apartmentId) this.loadApartment();
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.apartmentSubscription) this.apartmentSubscription.unsubscribe();
  }

  loadApartment() {
    this.apartmentSubscription = this.apartmentService.getApartment(this.apartmentId).subscribe(data => {
      this.apartment = data;
    });
  }

  async saveApartment() {
    await this.presentLoading();

    this.apartment.userId = this.authService.getAuth().currentUser.uid;

    if (this.apartmentId) {
      try {
        await this.apartmentService.updateApartment(this.apartmentId, this.apartment);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      this.apartment.createdAt = new Date().getTime();

      try {
        await this.apartmentService.addApartment(this.apartment);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/apartment');
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