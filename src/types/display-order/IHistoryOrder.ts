import type { IOrder } from 'src/types/display-order/IOrder';

export interface IHistoryOrder extends IOrder {
  orderNumber: number;
  initialPrice: number;
  averagePrice: number;
  fee: null | number;
  total: null | number;
}
