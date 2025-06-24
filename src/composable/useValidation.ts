import { useI18n } from 'vue-i18n';
import { ExceptionsEnum } from 'src/enums/common/ExceptionsEnum';
import { Decimal } from 'decimal.js';

interface IValidationConfig {
  message?: string;
}

export const useValidation = () => {
  const { t } = useI18n();

  const requiredField = (config: IValidationConfig) => (val: string | number | undefined) =>
    !!val || val === 0 || t(config.message || ExceptionsEnum.FIELD_IS_REQUIRED);

  const minValue = (min: number, config: IValidationConfig) => (val: string | number | undefined) =>
    new Decimal(val || 0).greaterThanOrEqualTo(min) ||
    `${config.message || t(ExceptionsEnum.MIN_VALUE_IS)} ${min}`;

  const moreThan = (min: number, config: IValidationConfig) => (val: string | number | undefined) =>
    new Decimal(val || 0).greaterThan(min) ||
    `${config.message || t(ExceptionsEnum.VALUE_MUST_BE_MORE_THAN)} ${min}`;

  return {
    requiredField,
    minValue,
    moreThan,
  };
};
