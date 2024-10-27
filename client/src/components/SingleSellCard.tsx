import React, { useEffect, useRef, useState } from 'react';
import OrderDetailsModal from './OrderDetailsModal';

interface OrderData {
  id: string;
  uid: string;
  element: string;
  type: string;
  grams: number;
  spotprice: number;
  totaldigitalprice: number;
  date: string;
}

interface GoldRate {
  price_gram_18k: number;
  price_gram_20k: number;
  price_gram_22k: number;
  price_gram_24k: number;
}

interface SingleSellCardProps {
  order: OrderData;
  handleDeleted: () => void;
  goldRates: GoldRate | null;
}

const SingleSellCard: React.FC<SingleSellCardProps> = ({ order, goldRates, handleDeleted }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsModalOpen(false);
            }
        };

        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen]);

  const current = goldRates ? goldRates[`price_gram_${order.type}` as keyof GoldRate] : 0;
  
  const profitLoss = order.spotprice > 0 
    ? (((current - order.spotprice) / order.spotprice) * 100).toFixed(2)
    : "0.00";

  const capitalizedElement = order.element.toUpperCase();

  return (
    <>
      <div className="bg-gradient-to-b to-black from-[#001D3D] rounded-lg shadow-md w-[230px] h-[250px] p-6 flex flex-col items-center justify-between relative gap-11">
        <h3 className="text-xl font-normal text-white mb-2 w-full m-0">{capitalizedElement}</h3>
        <img src={`/subtract/${order.type}.svg`} alt="" className="absolute top-12 h-[100px] w-[170px]" />
        <p className="text-white absolute top-24 text-3xl">{order.type}</p>

        <div className={`absolute bottom-24 translate-x-2 translate-y-1 ${Number(profitLoss) < 0 ? 'text-red-500' : 'text-green-500'}`}>
          {Number(profitLoss) >= 0 ? <img src="/profitLoss/profit.svg" alt="" className='relative top-[18px] -left-5 h-3'/> : <img src="/profitLoss/loss.svg" alt="" className='relative top-[18px] -left-5 h-3'/>}<p>{profitLoss}%</p>
        </div>
        <p className='relative top-12 font-light'>{order.grams} g</p>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="border border-[--primary--] rounded-full px-14 py-1 hover:bg-[--primary--] hover:text-[--secondary--] duration-500"
        >
          Details
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 duration-1000">
          <div ref={ref}>
            <OrderDetailsModal 
            order={order} 
            stats={{ current, profitLoss }}
            onClose={() => setIsModalOpen(false)}
            handleDeleted={handleDeleted}
          />
          </div>
        </div>
      )}
    </>
  );
};

export default SingleSellCard;