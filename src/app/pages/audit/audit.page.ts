import { Component, OnInit } from '@angular/core';
import { Audit } from 'src/app/interfaces/audit';
import { Subscription } from 'rxjs';
import { AuditService } from 'src/app/services/audit.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';
import 'firebase/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.page.html',
  styleUrls: ['./audit.page.scss'],
})
export class AuditPage implements OnInit {

  private loading: any;
  public audits = new Array<Audit>();
  private auditsSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private productService: AuditService,
    private toastCtrl: ToastController,
    private db : AngularFirestore
  ) {
    this.auditsSubscription = this.productService.getAudits().subscribe(data => {
      this.audits = data;
    });
  }

  ngOnInit() { 
    this.db.collection('audit').valueChanges().subscribe(val => console.log(val))
  }

  ngOnDestroy() {
    this.auditsSubscription.unsubscribe();
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
      await this.productService.deleteAudit(id);
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
