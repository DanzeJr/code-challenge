import {
  CircularProgress,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from '@mui/material';
import { type ChangeEvent, type FC, type KeyboardEvent } from 'react';
import type { Currency } from '../../types';
import CurrencyItem from '../CurrencyItem';

type CurrencyFieldProps = {
  options: Currency[];
  currency?: Currency;
  onCurrencyChange: (currency?: Currency) => void;
  amount?: number;
  onAmountChange: (amount?: number) => void;
  isReadOnly?: boolean;
  isLoading?: boolean;
};

const CurrencyField: FC<CurrencyFieldProps> = ({
  options,
  currency,
  onCurrencyChange,
  amount,
  onAmountChange,
  isReadOnly = false,
  isLoading = false,
}) => {
  const handleCurrencyChange = (event: SelectChangeEvent) => {
    onCurrencyChange(
      options.find((option) => option.currency === event.target.value)
    );
  };

  const handleAmountChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value ? +event.target.value : undefined;
    onAmountChange(value);
  };

  const handleAmountKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (['e', 'E', '-', '+'].includes(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Select
        displayEmpty
        variant="outlined"
        className="w-full"
        MenuProps={{
          className: 'max-h-96',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        }}
        value={currency?.currency ?? ''}
        onChange={handleCurrencyChange}
        renderValue={(value) =>
          value ? (
            <CurrencyItem name={value} icon={currency?.icon} />
          ) : (
            <span className="text-neutral-500">Select a currency</span>
          )
        }>
        {isLoading ? (
          <div className="flex justify-center items-center py-7">
            <CircularProgress size={24} />
          </div>
        ) : !options.length ? (
          <div className="flex justify-center items-center h-10 text-gray-500 uppercase">
            No items
          </div>
        ) : (
          options.map((option) => (
            <MenuItem key={option.currency} value={option.currency}>
              <CurrencyItem name={option.currency} icon={option.icon} />
            </MenuItem>
          ))
        )}
      </Select>
      <TextField
        label="Amount"
        type="number"
        placeholder={isReadOnly ? '' : 'Enter amount'}
        onChange={handleAmountChange}
        onKeyDown={handleAmountKeyDown}
        value={amount ?? ''}
        slotProps={{
          input: {
            className: isReadOnly ? '!bg-gray-100' : undefined,
          },
          htmlInput: {
            disabled: isReadOnly,
          },
        }}
      />
    </div>
  );
};

export default CurrencyField;
