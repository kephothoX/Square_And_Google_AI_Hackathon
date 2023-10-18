
/*export interface Invoice {
  id: String;
  version: number;
  location_id: String;
  order_id: String;
  payment_requests: [
     {
       uid: String;
       request_type: String;
       due_date: String;
       tipping_enabled: boolean;
       computed_amount_money: {
          amount: number;
          currency: String;
       };
       total_completed_amount_money: {
          amount: number;
          currency: String;
       };
       automatic_payment_source: String;
     }
   ];
    primary_recipient: {
      customer_id: String;
      given_name: String;
      family_name: String;
      email_address: String;
      phone_number: String;
      company_name: String;
      address: {
        address_line_1: String;
        address_line_2: String;
        locality: String;
        administrative_district_level_1: String;
        postal_code: String;
        country: String;
      }
   };
   invoice_number: String;
   title: String;
   scheduled_at: String;
   status: String;
   timezone: String;
   created_at: String;
   updated_at: String;
   accepted_payment_methods: {
      card: boolean;
      square_gift_card: boolean;
      bank_account: boolean;
      buy_now_pay_later: boolean
   };
    delivery_method: String;
    sale_or_service_date: String;
    store_payment_method_enabled: boolean
}
*/




export interface Invoice {
  id: String;
  version: number;
  location_id: String;
  order_id: String;
  payment_requests: [
    {
      uid: String;
      request_type: String;
      due_date: Date;
      tipping_enabled: Boolean;
      computed_amount_money: {
        amount: number;
        currency: String;
      },
      total_completed_amount_money: {
        amount: number;
        currency: String;
      },
      reminders: [
        {
          uid: String;
          relative_scheduled_days: number;
          message: String;
          status: String;
        }
      ],
      automatic_payment_source: String;
    }
  ],
  primary_recipient: {
    customer_id: String;
    given_name: String;
    family_name: String;
    email_address: String;
    phone_number: String;
    company_name: String;
    address: {
      address_line_1: String;
      address_line_2: String;
      locality: String;
      administrative_district_level_1: String;
      postal_code: number;
      country: String;
    }
  },
  invoice_number: number;
  title: String;
  scheduled_at: String;
  status: String;
  timezone: String;
  created_at: String;
  updated_at: String;
  public_url?: String;
  accepted_payment_methods: {
    card: boolean;
    square_gift_card: boolean;
    bank_account: boolean;
    buy_now_pay_later: boolean;
  },
  delivery_method: String;
  sale_or_service_date: Date
  store_payment_method_enabled: boolean;
}


export interface CustomFields {
  label: String;
  value: String;
  placement: String;
}

export interface AcceptedPaymentMethods {
  card: String;
  square_gift_card: boolean;
  bank_account: boolean;
  buy_now_pay_later: boolean;
}


