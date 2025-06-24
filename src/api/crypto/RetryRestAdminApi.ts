import { http } from 'boot/axios';

export const retryTransaction = async (id: string): Promise<void> =>
  (await http.post('/crypto/admin/retry_transaction', null, { params: { id } })).data;
