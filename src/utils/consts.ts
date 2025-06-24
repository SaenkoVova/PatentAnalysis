import { BotTypesEnum } from 'src/enums/ai-trading/BotTypesEnum';
import { AlgorithmTunesEnum } from 'src/enums/ai-trading/AlgorithmTunesEnum';
import { EarnPeriodsEnum } from 'src/enums/referral/EarnPeriodsEnum';
import { UserRolesEnum } from 'src/enums/user/UserRolesEnum';

export const PAGEABLE_SIZE = 20;

export const USER_ROLES: UserRolesEnum[] = [
  UserRolesEnum.USER,
  UserRolesEnum.ADMIN,
  UserRolesEnum.SUPER_ADMIN,
];

export const STABLE_COINS = ['USDT', 'USDC', 'DAI', 'BUSD'];

export const BOT_TYPES = [
  {
    value: BotTypesEnum.START,
    label: 'Scalping',
  },
  {
    value: BotTypesEnum.BASE,
    label: 'Futures',
  },
  {
    value: BotTypesEnum.PRO,
    label: 'OTC',
  },
];

export const ALGORITHM_TUNING_TYPES = [
  {
    value: AlgorithmTunesEnum.STARTER,
    label: 'Starter',
  },
  {
    value: AlgorithmTunesEnum.STABLE,
    label: 'Stable',
  },
  {
    value: AlgorithmTunesEnum.BALANCED,
    label: 'Balanced',
  },
  {
    value: AlgorithmTunesEnum.INTENSE,
    label: 'Intense',
  },
];

export const EARN_PERIODS = [
  {
    label: 'forAllTheTime',
    value: EarnPeriodsEnum.ALL_TIME,
  },
  {
    label: 'lastMonth',
    value: EarnPeriodsEnum.MONTH,
  },
  {
    label: 'last7Days',
    value: EarnPeriodsEnum.WEEK,
  },
  {
    label: 'today',
    value: EarnPeriodsEnum.TODAY,
  },
];

export const BASE_LINE_COL_WIDTH = 50;
export const BASE_EMAIL_COL_WIDTH = 650;
export const REG_DATE_COL_WIDTH = 90;
export const REG_DATE_COL_MR = 25;
export const LEVEL_COL_WIDTH = 50;
export const LEVEL_COL_MR = 25;
export const DEPOSIT_AMOUNT_COL_WIDTH = 80;
export const DEPOSIT_AMOUNT_COL_MR = 25;
export const TEAM_TURNOVER_COL_WIDTH = 110;
export const TEAM_TURNOVER_COL_MR = 25;
export const LEAD_LEVEL_TEAM_TURNOVER_COL_WIDTH = 90;
export const LEAD_LEVEL_TEAM_TURNOVER_COL_MR = 25;
export const TOTAL_RECEIVED_TURNOVER_COL_WIDTH = 90;
