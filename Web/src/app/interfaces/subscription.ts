export interface Subscription {
  idempotency_key: String;
  location_id: String;
  plan_id: String;
  customer_id: String;
  card_id: String;
  start_date: String;
  tax_percentage: String
  price_override_money: {
    amount: number;
    currency: String;
  };
  timezone: String;
  source: {
   name: String;
  }

}
