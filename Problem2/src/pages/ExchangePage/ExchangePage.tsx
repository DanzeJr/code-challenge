import type { FC } from 'react';
import ExchangeForm from '../../components/ExchangeForm';

const ExchangePage: FC = () => {
  return (
    <div className="flex size-full justify-center items-center bg-gray-800">
      <div className="flex flex-col gap-14 bg-white drop-shadow-2xl rounded-md py-20 px-32">
        <h1 className="py-4 px-3 font-semibold text-4xl uppercase rounded-2xl border">
          Currency Exchange
        </h1>
        <ExchangeForm />
      </div>
    </div>
  );
};

export default ExchangePage;
