import { Component, OnInit } from '@angular/core';
import { AuditService } from 'src/app/services/audit.service';
import { ActivatedRoute } from '@angular/router';
import { Audit } from 'src/app/interfaces/audit';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

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
  
  constructor(
    private auditService: AuditService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.auditId = this.activatedRoute.snapshot.params['id'];

    if (this.auditId) this.loadAudit();
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.auditSubscription) this.auditSubscription.unsubscribe();
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
