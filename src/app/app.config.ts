import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'ringoffire-f69eb',
          appId: '1:458353267360:web:7160f046e3225da598efc5',
          databaseURL:
            'https://ringoffire-f69eb-default-rtdb.europe-west1.firebasedatabase.app',
          storageBucket: 'ringoffire-f69eb.appspot.com',
          apiKey: 'AIzaSyDpXwF3nUoAzTQuhxj2_xrY-w-LerGOlTE',
          authDomain: 'ringoffire-f69eb.firebaseapp.com',
          messagingSenderId: '458353267360',
        })
      )
    ),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
