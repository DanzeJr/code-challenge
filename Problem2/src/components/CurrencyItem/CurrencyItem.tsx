import type { FC } from 'react';

type CurrencyItemProps = {
  name: string;
  icon?: string;
};

const CurrencyItem: FC<CurrencyItemProps> = ({ name, icon }) => {
  return (
    <div className="flex">
      <img className="w-5 mr-2" src={icon} alt="" />
      {name}
    </div>
  );
};

export default CurrencyItem;
