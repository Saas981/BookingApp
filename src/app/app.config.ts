import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';

import { firebaseConfig } from './constants/constants';
import { routes } from './app.routes';
import { initializeApp} from 'firebase/app';
import { browserSessionPersistence, getAuth, inMemoryPersistence, setPersistence} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
  ]
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence)

const db = getFirestore(app);
