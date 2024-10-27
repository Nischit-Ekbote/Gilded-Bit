import React, { useState, FormEvent } from "react";
import { useUser } from "@clerk/clerk-react";
import { Toaster, toast } from 'sonner';
import "./BuyGold.css";
import PayButton from "../../components/PayButton";

interface GoldRate {
  name: string;
  price: number;
}

interface BuyGoldPageProps {
  goldRates: {
    price_gram_18k: number;
    price_gram_20k: number;
    price_gram_22k: number;
    price_gram_24k: number;
  } | null;
}

const gramList = [{
  gram:'1',
},
{
  gram:'8',
},
{
  gram:'10',
},
{
  gram:'100',
},
{
  gram:'200',
}]

const BuyGoldPage: React.FC<BuyGoldPageProps> = ({ goldRates }) => {
  const { user } = useUser();
  const [grams, setGrams] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("24k");
  const type = selectedType;
  
  if (!goldRates) {
    return <div>Loading gold rates...</div>;
  }

  const goldTypes: GoldRate[] = [
    { name: "18K", price: goldRates.price_gram_18k },
    { name: "20k", price: goldRates.price_gram_20k },
    { name: "22k", price: goldRates.price_gram_22k },
    { name: "24k", price: goldRates.price_gram_24k },
  ];

  const currentPrice =
    goldTypes.find((type) => type.name.toLowerCase() === selectedType)?.price ||
    0;

  const tot = currentPrice * Number(grams) || 0 ;
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to buy gold.");
      return;
    }

    const gramsValue = parseFloat(grams);
    if (isNaN(gramsValue) || gramsValue <= 0) {
      toast.error("Please enter a valid number of grams.");
      return;
    }
  };

  const list = gramList.map((item : any, key : number) => (
    <div key={key} className="bg-[--secondary--] p-2 rounded-md cursor-pointer" onClick={()=>{setGrams(item.gram)}} >{item.gram} gm</div>
  ))

  return (
    <div className="buy__gold__container">
      <div className="w-fit">
        <Toaster richColors />
      <h1 className="text-4xl">Buy Gold</h1>
      <div className="gold-type-buttons">
        {goldTypes.map((type) => (
          <button
            key={type.name}
            onClick={() => setSelectedType(type.name.toLowerCase())}
            className={
              selectedType === type.name.toLowerCase()
                ? "goldTypeActive"
                : "goldType"
            }
          >
            {type.name}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="goldForm">
        <div className="goldForm-input flex justify-between">
          <input
            type="text"
            value={grams}
            onChange={(e) => setGrams(e.target.value)}
            placeholder="Enter grams of gold"
            // disabled={isLoading}
            required
          />
          <p>={tot.toFixed(2)}Rs</p>
        </div>  
        <div className="flex mb-4  gap-2">
          {list}
        </div>
        <PayButton 

          element="Gold"
          amount={currentPrice} 
          productName={`${grams}g of ${selectedType.toUpperCase()} Gold`} 
          grams={grams}
          type={type}
        />
      </form>
      </div>
      {/* <BuyGoldTable/> */}
    </div>
  );
};

export default BuyGoldPage;



// function BuyGoldTable({goldRates} : any) {

//     const goldTable = [
//     { name: '24k', price: goldRates.price_gram_24k || 0 },
//     { name: '22k', price: goldRates.price_gram_22k || 0 },
//     { name: '20k', price: goldRates.price_gram_20k || 0 },
//     { name: '18k', price: goldRates.price_gram_18k || 0 },
//   ];

//   return (
//     <div className="p-10">
//       <h1>Today's Price</h1>
//       <table>
//         <tbody>
//           {goldTable.map((item, i) => (
//             <tr key={i}>
//               <td>{item.name} -</td>
//               <td>{item.price}</td>
//               <td> / gram</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

