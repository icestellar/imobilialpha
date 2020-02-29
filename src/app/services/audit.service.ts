import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Audit } from '../interfaces/audit';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  private AuditsCollection: AngularFirestoreCollection<Audit>;

  constructor(private afs: AngularFirestore) {
    this.AuditsCollection = this.afs.collection<Audit>('Audits');
  }

  getAudits() {
    return this.AuditsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addAudit(Audit: Audit) {
    return this.AuditsCollection.add(Audit);
  }

  getAudit(id: string) {
    return this.AuditsCollection.doc<Audit>(id).valueChanges();
  }

  updateAudit(id: string, Audit: Audit) {
    return this.AuditsCollection.doc<Audit>(id).update(Audit);
  }

  deleteAudit(id: string) {
    return this.AuditsCollection.doc(id).delete();
  }
}
