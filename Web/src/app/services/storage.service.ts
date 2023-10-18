import { Injectable } from '@angular/core';

import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private appService: AppService
  ) { }

  app = this.appService.app;
}
