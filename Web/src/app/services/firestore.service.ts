import { Injectable } from '@angular/core';

import { AppService } from '../services/app.service';

import {
  persistentLocalCache,
  persistentMultipleTabManager,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  initializeFirestore,
  serverTimestamp,
}  from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private appService: AppService
  ) { }

  app = this.appService.app

  db = initializeFirestore(this.app,
    {
      localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
    },
  )
}
