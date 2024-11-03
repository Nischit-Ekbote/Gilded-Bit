import { useEffect, useState } from 'react';
import './App.css';
import { useUser } from "@clerk/clerk-react";
import NavBar from './components/navBar/NavBar';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import BuyGoldPage from './pages/buy/BuyGoldPage';
import SellGoldPage from './pages/sell/SellGoldPage';
import Success from './pages/sucess/Success';
import AboutPage from './pages/about/About';
import { toast, Toaster } from 'sonner';

const API_BASE_URL = "https://gilded-bit.vercel.app/api/v1";

interface GoldRates {
  price_gram_18k: number;
  price_gram_20k: number;
  price_gram_22k: number;
  price_gram_24k: number;
}

interface UserData {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | undefined;
}

function App(): JSX.Element {
  const [goldRates, setGoldRates] = useState<GoldRates | null>(null);
  const { user } = useUser();
  const location = useLocation(); 

  useEffect(() => {
    async function fetchAndUpdateGoldRates() {
      try {

        const externalResponse = await fetch(`https://www.goldapi.io/api/XAU/INR`, {
          headers: {
            'x-access-token': import.meta.env.VITE_GOLD_API_KEY,
          },
        });
        // const externalResponse = await fetch(`${API_BASE_URL}/gold/getData`)

        if (!externalResponse.ok) {
          throw new Error('Failed to fetch gold rates from external API');
        }

        const externalData = await externalResponse.json();

        // Update our database
        const body = {
          "k18": externalData.price_gram_18k * 10,
          "k20": externalData.price_gram_20k * 10,
          "k22": externalData.price_gram_22k * 10,
          "k24": externalData.price_gram_24k * 10, 
        };

        const updateResponse = await fetch(`${API_BASE_URL}/addgoldData`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });

        if (!updateResponse.ok) {
          throw new Error('Failed to update gold rates in database');
        }

        setGoldRates(externalData);
      } catch (err) {
        // setError((err as Error).message);
        toast.error((err as Error).message)
        console.error('Error in gold rate operations:', err);
      }
    }

    fetchAndUpdateGoldRates();

    const intervalId = setInterval(fetchAndUpdateGoldRates, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  console.log(API_BASE_URL)

  useEffect(() => {
    async function handleLogin() {
      if (user) {
        try {
          const userData: UserData = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.primaryEmailAddress?.emailAddress,
          };

          const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });

          if (response.status!==409) {
            console.log('User already exists')
          }
          else if(!response.ok){
            throw new Error('Failed to send user data')
          }
          else{
            console.log('User data sent successfully');
          }
        } catch (err) {
          console.error('Error sending user data:', (err as Error).message);
        }
      }
    }

    handleLogin();
  }, [user]);

  const backgroundColor = location.pathname !== '/'
    ? 'linear-gradient(180deg, #000000 0%, #001D3D 100%) ' // Home background
    : ''; // Default background for other routes

  return (
      <div style={{ display: 'flex', background: backgroundColor , minHeight:'calc(100vh+10px)'}}>
        <Toaster richColors/>
        <NavBar />
        <div className='lg:w-[100px]'></div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/buy/gold" element={<BuyGoldPage goldRates={goldRates} />} />
          <Route path="/success" element={<Success/>}></Route>
          {/* <Route path="cancel" element={<C/>}></Route> */}
          <Route path="/sell/gold" element={<SellGoldPage goldRates={goldRates} />} />
        </Routes>
      </div>
  );
}

export default App;