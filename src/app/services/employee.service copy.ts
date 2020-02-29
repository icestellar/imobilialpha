import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Employee } from '../interfaces/employee';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private EmployeesCollection: AngularFirestoreCollection<Employee>;

  constructor(private afs: AngularFirestore) {
    this.EmployeesCollection = this.afs.collection<Employee>('Employees');
  }

  getEmployees() {
    return this.EmployeesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addEmployee(Employee: Employee) {
    return this.EmployeesCollection.add(Employee);
  }

  getEmployee(id: string) {
    return this.EmployeesCollection.doc<Employee>(id).valueChanges();
  }

  updateEmployee(id: string, Employee: Employee) {
    return this.EmployeesCollection.doc<Employee>(id).update(Employee);
  }

  deleteEmployee(id: string) {
    return this.EmployeesCollection.doc(id).delete();
  }
}
