export interface SubscriptionPlan {
  type: String;
  id: String;
  subscription_plan_data: {
    name: String;
    phases: {
      cadence: String;
      periods: number;
      recurring_price_money: {
        amount: number;
        currency:  String
      }
    }
  }
}

      

