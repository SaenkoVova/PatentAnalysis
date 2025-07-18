export interface IAlert {
  id: number;
  userId: string;
  status: string;
  active: boolean;
  updated: number;
  createdLastAlertTime: number;
  fiatEquivalent: number;
  alreadyUsed: number;
  last: boolean;
}
