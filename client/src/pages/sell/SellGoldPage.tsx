import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import SingleSellCard from "../../components/SingleSellCard";
import { toast, Toaster } from "sonner";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000/api/v1";

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

interface SellGoldPageProps {
  goldRates: GoldRate | null;
}

const SellGoldPage: React.FC<SellGoldPageProps> = ({ goldRates }) => {
  const { user } = useUser();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    if (user) {
      const loadOrders = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(`${API_BASE_URL}/sell/goldData`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: user.id }),
          });

          if (!response.ok) {
            throw new Error('Failed to fetch orders');
          }

          const data: OrderData[] = await response.json();
          setOrders(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setIsLoading(false);
        }
      };

      loadOrders();
    }
  }, [user, deleted]);

  return (
    <div className="pl-20 scroll-m-0">
      <Toaster richColors/>
      <h1 className="pt-10 pb-4 text-4xl">Sell</h1>
      {isLoading && <p>Loading orders...</p>}
      {error && <p>Error: {error}</p>}
      {orders.length > 0 ? (
        <ul className="flex gap-10 flex-wrap">
          {orders.map((order) => (
            <li key={order.id}>
              <SingleSellCard
                order={order}
                goldRates={goldRates}
                handleDeleted={()=>{
                  setDeleted(true);
                  toast.success('Deleted SuccessFully')
                }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

export default SellGoldPage;
