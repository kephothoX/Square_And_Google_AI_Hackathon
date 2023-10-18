import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { ErrorService } from '../services/error.service';
import { AppService } from '../services/app.service';

import { Observable, catchError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SquareService {

  constructor(
    private _errorService: ErrorService,
    private _appService: AppService,
    private _httpClient: HttpClient,
  ) { }



  getSquareCustomer(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ApiURL }/customer/email`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  createSquareCustomer(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ApiURL }/customer/new`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  addNewCatalogueItem(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ApiURL }/catalogue/new`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  addNewCatalogueImageItem(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ApiURL }/catalogue/image/new`, data, this._appService.httpMultipartFormOptions).pipe(catchError(this._errorService.handleError));
  }

  getcatalogueItems(): Observable<any> {
    return this._httpClient.get(`${ this._appService.ApiURL }/catalogue/items`, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getCatalogueItemById(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ApiURL}/catalogue/item`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }


  getLocations(): Observable<any> {
    return this._httpClient.get(`${ this._appService.ApiURL }/locations`, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  createNewOrder(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ApiURL }/orders/new`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getOrder(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ApiURL }/orders/get`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  calculateOrder(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ApiURL }/orders/calculate`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  completeOrder(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ApiURL }/orders/complete`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  generateInvoice(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ApiURL }/invoices/create`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }



  addNewCatalog(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ApiURL }/catalogue/new`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  listInvoices(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ApiURL }/invoices/list`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  publishInvoices(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ApiURL }/invoices/publish`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }


  cancelInvoice(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ApiURL }/invoices/cancel`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }



  listCatalog(): Observable<any> {
    return this._httpClient.get(`${ this._appService.ApiURL }/getSquareCatalog`, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getCatalogObject(object_id: string): Observable<any> {
    return this._httpClient.get(`${ this._appService.ApiURL }/catalog/${ object_id }`, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }


  addNewLocation(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ApiURL }/newSquareLocation`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  updateLocation(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ApiURL }/updateSquareLocation`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  listLocations(): Observable<any> {
    return this._httpClient.get(`${ this._appService.ApiURL }/getSquareLocations`, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getLocation(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ApiURL }/getSquareLocation`, data,  this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  editLocation(location: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ApiURL }/editSquareLocation`, location, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getUsers(): Observable<any> {
    return this._httpClient.get(`${ this._appService.ApiURL }/getSquareUsers`, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getUser(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ApiURL }/getSquareUser`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  updateUser(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ApiURL }/updateSquareUser`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  deleteUser(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ApiURL }/deleteSquareUser`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getInvoices(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ApiURL}/getSquareInvoices`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }


}
