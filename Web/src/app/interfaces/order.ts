export interface Order {
  id: String;
  location_id: String;
  line_items: [
    {
      uid: String;
      catalog_object_id: String;
      catalog_version: Number;
      quantity: String;
      name: String;
      variation_name: String;
      base_price_money: {
        amount: Number;
        currency: String;
      }
      gross_sales_money: {
        amount: Number;
        currency: String;
      }
      total_tax_money: {
        amount: Number;
        currency: String;
      }
      total_discount_money: {
        amount: Number;
        currency: String;
      }
      total_money: {
        amount: Number;
        currency: String;
      }
      variation_total_price_money: {
        amount: Number;
        currency: String;
      }
      item_type: String;
      total_service_charge_money: {
        amount: Number;
        currency: String;
      }
    }
  ]
  created_at: String;
  updated_at: String;
  state: String;
  version: 1
  total_tax_money: {
    amount: Number;
    currency: String;
  }
  total_discount_money: {
    amount: Number;
    currency: String;
  }
  total_tip_money: {
    amount: Number;
    currency: String;
  }
  total_money: {
    amount: Number;
    currency: String;
  }
  total_service_charge_money: {
    amount: Number;
    currency: String;
  }
  net_amounts: {
    total_money: {
      amount: Number;
      currency: String;
    }
    tax_money: {
      amount: Number;
      currency: String;
    }
    discount_money: {
      amount: Number;
      currency: String;
    }
    tip_money: {
      amount: Number;
      currency: String;
    }
    service_charge_money: {
      amount: Number;
      currency: String;
    }
  }
  source: {
    name: String;
  }
  net_amount_due_money: {
    amount: Number;
    currency: String;
  }
}

export interface LineItem {
  item_id: String;
  item_name: String;
  quantity: Number;
  item_amount: Number;
}

