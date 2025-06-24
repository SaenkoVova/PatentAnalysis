import type { IPageableRequest } from 'src/types/common/IPageableRequest';
import type { IPageableResponse } from 'src/types/common/IPageableResponse';
import { http } from 'boot/axios';
import type { ITrade } from 'src/types/display-order/ITrade';

export const getTrades = async (
  pair: string,
  params: IPageableRequest,
): Promise<IPageableResponse<ITrade>> =>
  (await http.get(`/display-order/admin/trades/${pair}`, { params })).data;

export const getUserTrades = async (
  pair: string,
  userId: string,
  params: IPageableRequest,
): Promise<IPageableResponse<ITrade>> =>
  (
    await http.get(`/display-order/admin/trades/user/${userId}/${pair}`, {
      params,
    })
  ).data;
