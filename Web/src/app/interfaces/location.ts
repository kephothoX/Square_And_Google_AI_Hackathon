export interface Location {
  id?: String;
  merchant_id?: String;
  status?: String;
  timezone?: String;
  language_code?: String;
  mcc?: String;
  name: String;
  capabilities?: String[];
  country?: String;
  created_at?: String;
  currency?: String;
  description: String;
  address: {
    address_line_1: String;
    locality: String;
    administrative_district_level_1: String;
    postal_code: String;
  };
  business_hours: BusinessHours;
  business_name: String;
  business_email: String;
  facebook_url: String;
  instagram_username: String;
  twitter_username: String;
  website_url?: String,
  phone_number: String;
  type: String;
  coordinates: {
    latitude: number;
    longitude: number;
  }

}

export interface BusinessHours {
  periods: Periods;
}

export interface Periods {
  day_of_week: String;
  end_local_time: String;
  start_local_time: String;

}
