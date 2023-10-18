import { Address } from '../interfaces/address';
import { Contact } from '../interfaces/contact';


export interface Vendor {
  name: String;
  address: Address;
  contacts: Contact;
  account_number: number;
  note: String;
}

 
  