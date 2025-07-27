import { useEffect, useState, type FC } from 'react';
import { Button } from '@mui/material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import type { Currency } from '../../types';
import CurrencyField from '../CurrencyField';
import { CurrencyService } from '../../services';
import { enqueueSnackbar } from 'notistack';

const ExchangeForm: FC = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [fromCurrency, setFromCurrency] = useState<Currency>();
  const [toCurrency, setToCurrency] = useState<Currency>();
  const [fromAmount, setFromAmount] = useState<number>();
  const [toAmount, setToAmount] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await CurrencyService.getCurrencies();
        data.forEach((item) => {
          const img = new Image();
          img.src = item.icon ?? '';
        });
        setCurrencies(data);
      } catch {
        enqueueSnackbar('An error occurred when fetching data.', {
          variant: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const exchange = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleFromCurrencyChange = (currency?: Currency) => {
    setFromCurrency(currency);
    if (!toCurrency || !currency || fromAmount === undefined) return;
    setToAmount((fromAmount / currency.price) * toCurrency.price);
  };

  const handleFromAmountChange = (amount?: number) => {
    setFromAmount(amount);
    if (!toCurrency || !fromCurrency) return;
    setToAmount(
      amount === undefined
        ? undefined
        : (amount / fromCurrency.price) * toCurrency.price
    );
  };

  const handleToCurrencyChange = (currency?: Currency) => {
    setToCurrency(currency);
    if (!fromCurrency || !currency || fromAmount === undefined) return;
    setToAmount((fromAmount / fromCurrency.price) * currency.price);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <CurrencyField
        isLoading={isLoading}
        options={currencies}
        currency={fromCurrency}
        amount={fromAmount}
        onCurrencyChange={handleFromCurrencyChange}
        onAmountChange={handleFromAmountChange}
      />
      <Button
        variant="outlined"
        className="w-32"
        aria-label="exchange"
        onClick={exchange}>
        <CurrencyExchangeIcon />
      </Button>
      <CurrencyField
        isReadOnly
        isLoading={isLoading}
        options={currencies}
        currency={toCurrency}
        amount={toAmount}
        onCurrencyChange={handleToCurrencyChange}
        onAmountChange={setToAmount}
      />
    </div>
  );
};

export default ExchangeForm;
