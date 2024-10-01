
import React, { useState } from 'react';
import { X } from 'lucide-react';
import SpinnerLoader from '../components/spinnerLoader/SpinnerLoader';
import CustomChart from './chart/CustomChart'

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

interface Stats {
    current: number,
    profitLoss: string
}

interface OrderDetailsModalProps {
  order: OrderData;
  onClose: () => void;
  handleDeleted: () => void;
  stats: Stats;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, onClose, handleDeleted, stats }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSell = async () => {
    setIsLoading(true);
    const body = {
      id: order.id
    }

    try {
      const response = await fetch('http://localhost:4000/api/v1/sell/gold', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      
      if (response.ok) {
        setTimeout(() => {
          setIsLoading(false);
          handleDeleted();
          onClose();
        }, 2000);
      } else {
        throw new Error('Failed to sell gold');
      }
    } catch (error: any) {
      console.error('Error selling gold:', error);
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 duration-1000">
      <div className="bg-gradient-to-b to-black from-[#001D3D] rounded-lg p-8 w-[26rem] relative">
        <button 
          onClick={onClose}
          className="absolute -top-4 -right-4 text-gray-500 hover:text-black bg-[--primary--] rounded-3xl p-2"
        >
          <X size={24} />
        </button>
        <h2 className="text-m font-normal mb-4">SELL / {order.element} - {order.type} / {order.grams} g</h2>
        <div className="space-y-2">
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <td>Bought Price</td>
                <td>Current Price</td>
                <td>Change</td>
              </tr>
            </thead>
            <tbody>
              <tr className='text-xl'>
                <td>{order.spotprice}</td>
                <td className={`${ Number(stats.profitLoss) < 0 ? 'text-red-500' : 'text-[#00FF29]' }`}>
                  {stats.current}
                </td >
                <td rowSpan={2} className={`${ Number(stats.profitLoss) < 0 ? 'text-red-500' : 'text-[#00FF29]'}`}>{stats.profitLoss}</td>
              </tr>
            </tbody>
          </table>
            <CustomChart element={order.element} type={order.type}/>
          <button onClick={handleSell} className='w-full border border-[--primary--] rounded py-1 hover:bg-[--primary--] hover:text-[--secondary--] hover:font-semibold'>
            {isLoading ? <SpinnerLoader/> : 'SELL'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;