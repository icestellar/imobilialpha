import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Apartment } from '../interfaces/apartment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  private ApartmentsCollection: AngularFirestoreCollection<Apartment>;
  constructor(private afs: AngularFirestore) {
    this.ApartmentsCollection = this.afs.collection<Apartment>('Apartments');
  }
  getApartments() {
    return this.ApartmentsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }
  addApartment(Apartment: Apartment) {
    return this.ApartmentsCollection.add(Apartment);
  }
  getApartment(id: string) {
    return this.ApartmentsCollection.doc<Apartment>(id).valueChanges();
  }
  updateApartment(id: string, Apartment: Apartment) {
    return this.ApartmentsCollection.doc<Apartment>(id).update(Apartment);
  }
  deleteApartment(id: string) {
    return this.ApartmentsCollection.doc(id).delete();
  }
}
