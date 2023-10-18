import { Address } from './address';


export interface User extends Address{
  given_name: String;
  family_name: String;
  email_address: String;
  company_name: String;
  phone_number: String;
}


export interface AdminUser {
  given_name: String;
  family_name: String;
  email_address: String;
  password: String;
  phone_number: String;
}

export interface UserCredentials {
  email_address: String;
  password: String;
  active?: boolean,
}

export interface EditUser {
  address: Address
  given_name: String;
  family_name: String;
  email_address: String;
  company_name: String;
  phone_number: String;
}


export interface Customer {
  id?: String;
  created_at?: String;
  updated_at?: String;
  given_name: String;
  family_name: String;
  email_address: String;
  address: {
    address_line_1: String;
    address_line_2: String;
    locality: String;
    administrative_district_level_1: String;
    postal_code: String;
    country: String;
  };
  phone_number: String;
  company_name: String;
  preferences?: {
    email_unsubscribed: boolean;
  };
  creation_source?: String;
  segment_ids?: [
    String,
  ];
  version?: number;

}

