import { AxiosError } from 'axios';
import { STABLE_COINS } from 'src/utils/consts';

export const formatException = (e: Error): string => {
  if (e instanceof AxiosError) {
    const status = e.response?.status;
    if (status === 400) {
      const code = e.response?.data?.code || 'Unknown error occurred';
      return e.response?.data?.message || code;
    } else if (status === 500) {
      return 'Internal Server Error';
    } else {
      return 'Unknown error occurred';
    }
  }
  return e.message;
};

export const isStableCoin = (val: string) => {
  return STABLE_COINS.includes(val);
};

export const capitalizeFirstLetter = (string: string) =>
  string.toLowerCase().charAt(0).toUpperCase() + string.toLowerCase().slice(1);

export const isExchangeTx = (hash: string) => hash.includes('EXCHANGE');

export const isGameTx = (hash: string) => hash.includes('GAME');

export const isAccountTx = (hash: string) =>
  isExchangeTx(hash) || isGameTx(hash);

export const isSystemTx = (network: string) => network.includes('SYSTEM');

export const buildExplorerLink = (
  state: 'tx' | 'address',
  hash: string,
  network: string
) => {
  switch (network) {
    case 'ETH':
      return `${process.env.ETH_EXPLORER_LINK}/${state}/${hash}`;
    case 'POLYGON':
      return `${process.env.POLYGON_EXPLORER_LINK}/${state}/${hash}`;
    case 'BSC':
      return `${process.env.BSC_EXPLORER_LINK}/${state}/${hash}`;
    case 'TRX':
      return `${process.env.TRON_EXPLORER_LINK}/#/${
        state === 'tx' ? 'transaction' : state
      }/${hash}`;
    case 'BTC':
      return `${process.env.BTC_EXPLORER_LINK}/${state}/${hash}`;
  }
};
