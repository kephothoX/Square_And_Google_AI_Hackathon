import { Injectable } from '@angular/core';
import { Cadence } from '../interfaces/cadence'

@Injectable({
  providedIn: 'root'
})
export class CadenceService {

  constructor() { }

  Cadence: Cadence[] = [
    {
      name: 'Daily',
      value: 'DAILY'
    },

    {
      name: 'Weekly',
      value: 'WEEKLY'
    },

    {
      name: 'Monthly',
      value: 'MONTHLY'
    },

    {
      name: 'Annual',
      value: "ANNUAL"
    },
  ]
}
