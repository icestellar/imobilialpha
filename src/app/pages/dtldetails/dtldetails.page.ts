import { Component, OnInit } from '@angular/core';
import { AuditService } from 'src/app/services/audit.service';
import { ActivatedRoute } from '@angular/router';
import { Audit } from 'src/app/interfaces/audit';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Camera , CameraOptions} from '@ionic-native/camera/ngx';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-dtldetails',
  templateUrl: './dtldetails.page.html',
  styleUrls: ['./dtldetails.page.scss'],
})
export class DtldetailsPage implements OnInit {

  private auditId: string = null;
  public audit: Audit = {};
  private loading: any;
  private auditSubscription: Subscription;
  public uploadPercent : Observable<number>;
  public downloadUrl: Observable<string>;
  
  constructor(
    private auditService: AuditService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private camera: Camera,
    private platform: Platform,
    private file: File,
    private afStorage: AngularFireStorage
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
  async openGalery(){
    const options: CameraOptions ={
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    };

    try{
      const fileUri: string = await this.camera.getPicture(options);
      let file: string;
      if(this.platform.is('ios')){
        file = fileUri.split('/').pop();
      }else{
        file = fileUri.substring(fileUri.lastIndexOf('/') + 1, fileUri.lastIndexOf('?'));
      }

      const path: string = fileUri.substring(0, fileUri.lastIndexOf('/'));
      const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path,file);
      const blob: Blob = new Blob([buffer], {type: 'image/jpeg'});

      this.uploadPicture(blob);

    }catch(error)
    {
      console.error(error);
    }
  }
  uploadPicture(blob: Blob){
    const ref = this.afStorage.ref('ionic.jpg');
    const task = ref.put(blob);

    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(( ) => this.downloadUrl = ref.getDownloadURL())
    ).subscribe();
  }

}
