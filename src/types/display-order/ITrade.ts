import type { OrderSidesEnum } from 'src/enums/order/OrderSidesEnum';

export interface ITrade {
  pair: string;
  created: string;
  side: OrderSidesEnum;
  price: number;
  quantity: number;
}
