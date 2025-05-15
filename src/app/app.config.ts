import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "angular-clothingshop", appId: "1:980582657597:web:4aa064f49130b6de8f4454", storageBucket: "angular-clothingshop.firebasestorage.app", apiKey: "AIzaSyA4KDwbpzhMsSK7YT30MZ-dxGC-Ic2sr7I", authDomain: "angular-clothingshop.firebaseapp.com", messagingSenderId: "980582657597" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
