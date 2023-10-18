export interface Catalog {
  type: string;
  id: string;
  updated_at: string;
  created_at: string;
  version: number;
  is_deleted: boolean;
  present_at_all_locations: boolean;
  subscription_plan_data: {
    name: string;
    phases: [
      {
        uid: string;
        cadence: string;
        recurring_price_money: {
          amount: number;
          currency: string;
        };
        ordinal: number;
      }
    ]
  }
}


export interface Catalogue {
  type: String;
  id: String;
  updated_at: String;
  created_at: String;
  version: Number;
  is_deleted: Boolean;
  present_at_all_locations: Boolean;
  item_data: {
    name: String;
    description: String;
    abbreviation: String;
    label_color: String;
    is_taxable: Boolean;
    visibility: String;
    available_online: Boolean;
    available_for_pickup: Boolean;
    available_electronically: Boolean;
    variations: Array<
      {
        type: String;
        id: String;
        updated_at: String;
        created_at: String;
        version: Number
        is_deleted: Boolean;
        present_at_all_locations: Boolean;
        item_variation_data: {
          item_id: String;
          name: String;
          sku: String;
          ordinal: Number;
          pricing_type: String;
          price_money: {
            amount: Number;
            currency: String;
          };
          inventory_alert_type: String;
          inventory_alert_threshold: Number;
          available_for_booking: Boolean;
          sellable: Boolean;
          stockable: Boolean;
          image_ids: Array<String>;
        }
      }
    >;
    product_type: String;
    skip_modifier_screen: Boolean;
    ecom_visibility: String;
    image_ids: Array<String>
    is_archived: Boolean
  }
}



