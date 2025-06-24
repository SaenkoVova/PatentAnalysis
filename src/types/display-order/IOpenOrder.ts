import type { IOrder } from 'src/types/display-order/IOrder';

export interface IOpenOrder extends IOrder {
  price: number;
}
