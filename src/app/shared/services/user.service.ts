import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, collection, query, where, getDocs, updateDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  getUserProfile(): Observable<{
    user: User | null,
  }> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        if (!authUser) {
          return of({
            user: null
          });
        }

        return from(this.fetchUserWithTasks(authUser.uid));
      })
    );
  }

  getUserProfileById(userId: string): Observable<User | null> {
    return from(this.fetchUserById(userId));
  }

  private async fetchUserById(userId: string): Promise<User | null> {
    try {
      const userDocRef = doc(this.firestore, 'Users', userId);
      const userSnapshot = await getDoc(userDocRef);
      if (!userSnapshot.exists()) {
        return null;
      }
      const userData = userSnapshot.data() as User;
      return { ...userData, id: userId };
    } catch (error) {
      console.error('Error loading user data:', error);
      return null;
    }
  }

  async updateUserProfile(userId: string, data: Partial<User>) {
    const userDocRef = doc(this.firestore, 'Users', userId);
    await updateDoc(userDocRef, data);
  }

  private async fetchUserWithTasks(userId: string): Promise<{
    user: User | null
  }> {
    try {
      // Felhasználó adatainak lekérése
      const userDocRef = doc(this.firestore, 'Users', userId);
      const userSnapshot = await getDoc(userDocRef);
      
      if (!userSnapshot.exists()) {
        return {
          user: null
        };
      }

      const userData = userSnapshot.data() as User;
      const user = { ...userData, id: userId };

      return {
        user
      };
    } catch (error) {
      console.error('Hiba a felhasználói adatok betöltése során:', error);
      return {
        user: null
      };
    }
  }
}