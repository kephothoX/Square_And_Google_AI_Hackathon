import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { ErrorService } from '../services/error.service';
import { AppService } from '../services/app.service';

import { Observable, catchError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GoogleAIService {

  constructor(
    private _errorService: ErrorService,
    private _appService: AppService,
    private _httpClient: HttpClient,
  ) { }



  promptAI(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ApiURL }/prompt`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  genAIDescription(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ApiURL }/gen-ai-desc`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  genAIProductDescription(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ApiURL }/gen-catalogue-item-description`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }
}
