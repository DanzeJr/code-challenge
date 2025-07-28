interface WalletBalance {
  currency: string;
  amount: number;
}

interface FormattedWalletBalance extends WalletBalance {
  formattedAmount: string;
}

enum CurrencyPriority {
  Osmosis = 'Osmosis',
  Ethereum = 'Ethereum',
  Arbitrum = 'Arbitrum',
  Zilliqa = 'Zilliqa',
  Neo = 'Neo',
}

const CURRENCY_PRIORITY_MAP = {
  [CurrencyPriority.Osmosis]: 100,
  [CurrencyPriority.Ethereum]: 50,
  [CurrencyPriority.Arbitrum]: 30,
  [CurrencyPriority.Zilliqa]: 20,
  [CurrencyPriority.Neo]: 20,
};

const WalletPage: FC<BoxProps> = ({ children, ...rest }) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const formattedBalances = useMemo(() => {
    const map = new Map();
    let data: FormattedWalletBalance[] = [];
    balances.forEach((balance) => {
      let priority = map.get(balance.currency);
      if (!priority) {
        priority = CURRENCY_PRIORITY_MAP[balance.currency] ?? -99;
        map.set(balance.currency, priority);
      }
      if (priority > -99 && balance.amount <= 0) {
        data.push({
          ...balance,
          formattedAmount: balance.amount.toFixed(),
        });
      }
    });
    data = data.sort(
      (left, right) => map.get(left.currency) - map.get(right.currency)
    );
    return data;
  }, [balances]);

  const rows = useMemo(() => {
    formattedBalances.map((balance) => {
      const usdValue = (prices[balance.currency] ?? 0) * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={balance.currency}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formattedAmount}
        />
      );
    });
  }, [formattedBalances, prices]);

  return <div {...rest}>{rows}</div>;
};
