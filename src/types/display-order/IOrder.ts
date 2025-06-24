import type { OrderSidesEnum } from 'src/enums/order/OrderSidesEnum';
import type { OrderTypesEnum } from 'src/enums/order/OrderTypesEnum';
import type { OrderStatusesEnum } from 'src/enums/order/OrderStatusesEnum';

export interface IOrder {
  id: string;
  orderNumber: number | null;
  tradingPair: string;
  baseCurrency: string;
  quotedCurrency: string;
  userId: string;
  stopPrice: null | number;
  initialQuantity: number;
  executedQuantity: number;
  side: OrderSidesEnum;
  type: OrderTypesEnum;
  status: OrderStatusesEnum;
  created: string;
  updated: string;
  orderTriggerConditions: string;
}
