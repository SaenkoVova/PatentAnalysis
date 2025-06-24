import { http } from 'boot/axios';
import type { IPageableResponse } from 'src/types/common/IPageableResponse';
import type { IOpenOrder } from 'src/types/display-order/IOpenOrder';
import type { IPageableRequest } from 'src/types/common/IPageableRequest';
import type { IHistoryOrder } from 'src/types/display-order/IHistoryOrder';

export const getUserActiveOrders = async (
  userId: string,
  params: IPageableRequest,
): Promise<IPageableResponse<IOpenOrder>> =>
  (await http.get(`/display-order/admin/orders/${userId}`, { params })).data;

export const getUserActiveOrdersByPair = async (
  userId: string,
  pair: string,
  params: IPageableRequest,
): Promise<IPageableResponse<IOpenOrder>> =>
  (await http.get(`/display-order/admin/orders/${userId}/${pair}`, { params })).data;

export const getUserHistoryOrdersByPair = async (
  userId: string,
  pair: string,
  params: IPageableRequest,
): Promise<IPageableResponse<IHistoryOrder>> =>
  (
    await http.get(`/display-order/admin/orders/${userId}/${pair}/history`, {
      params,
    })
  ).data;

export const getCountUserHistoryOrdersByPair = async (
  userId: string,
  pair: string,
): Promise<number> =>
  (await http.get(`/display-order/admin/orders/${userId}/${pair}/history/count`)).data;

export const getCountUserActiveOrdersByPair = async (
  userId: string,
  pair: string,
): Promise<number> => (await http.get(`/display-order/admin/orders/${userId}/${pair}/count`)).data;

export const getUserHistoryOrders = async (
  userId: string,
  params: IPageableRequest,
): Promise<IPageableResponse<IHistoryOrder>> =>
  (await http.get(`/display-order/admin/orders/${userId}/history`, { params })).data;

export const getCountUserHistoryOrders = async (userId: string): Promise<number> =>
  (await http.get(`/display-order/admin/orders/${userId}/history/count`)).data;

export const getCountUserActiveOrders = async (userId: string): Promise<number> =>
  (await http.get(`/display-order/admin/orders/${userId}/count`)).data;

export const getActiveOrders = async (
  params: IPageableRequest,
): Promise<IPageableResponse<IOpenOrder>> =>
  (await http.get('/display-order/admin/orders/all', { params })).data;
