import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/interfaces/employee';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-epldetails',
  templateUrl: './epldetails.page.html',
  styleUrls: ['./epldetails.page.scss'],
})
export class EpldetailsPage implements OnInit {
  private employeeId: string = null;
  public employee: Employee = {};
  private loading: any;
  private employeeSubscription: Subscription;
  
  constructor(
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.employeeId = this.activatedRoute.snapshot.params['id'];

    if (this.employeeId) this.loadEmployee();
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.employeeSubscription) this.employeeSubscription.unsubscribe();
  }

  loadEmployee() {
    this.employeeSubscription = this.employeeService.getEmployee(this.employeeId).subscribe(data => {
      this.employee = data;
    });
  }

  async saveEmployee() {
    await this.presentLoading();

    this.employee.userId = this.authService.getAuth().currentUser.uid;

    if (this.employeeId) {
      try {
        await this.employeeService.updateEmployee(this.employeeId, this.employee);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/employee');
      } catch (error) {
        
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      this.employee.createdAt = new Date().getTime();

      try {
        await this.employeeService.addEmployee(this.employee);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/employee');
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