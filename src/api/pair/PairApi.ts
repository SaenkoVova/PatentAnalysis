import { http } from 'boot/axios';
import type { IPair } from 'src/types/pair/IPair';

export const getActivePairs = async (): Promise<IPair[]> =>
  (await http.get('/pair/pairs/active')).data;
