import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {
  private contactCollection;

  constructor(private firestore: Firestore) {
    this.contactCollection = collection(this.firestore, 'ContactMessages');
  }

  async sendContactMessage(data: { name: string; email: string; messageType: string; message: string }) {
    await addDoc(this.contactCollection, {
      ...data,
      createdAt: new Date().toISOString()
    });
  }
}
