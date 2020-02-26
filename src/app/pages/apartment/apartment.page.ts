import { Component, OnInit } from '@angular/core';
import { Apartment } from 'src/app/interfaces/apartment';
import { Subscription } from 'rxjs';
import { ApartmentService } from 'src/app/services/ApartmentService';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.page.html',
  styleUrls: ['./apartment.page.scss'],
})
export class ApartmentPage implements OnInit {
  private loading: any;
  public apartments = new Array<Apartment>();
  private apartmentsSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private productService: ApartmentService,
    private toastCtrl: ToastController
  ) {
    this.apartmentsSubscription = this.productService.getApartments().subscribe(data => {
      this.apartments = data;
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.apartmentsSubscription.unsubscribe();
  }

  async logout() {
    await this.presentLoading();

    try {
      await this.authService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async deleteProduct(id: string) {
    try {
      await this.productService.deleteApartment(id);
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}
