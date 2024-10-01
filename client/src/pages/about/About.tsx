import React from 'react';
import { Shield, CreditCard, TrendingUp, DollarSign } from 'lucide-react';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const AboutPage: React.FC = () => {
  return (
    <div className="flex h-screen text-white">
      <div className="flex-grow p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-yellow-500">About GildedBit</h2>
        
        <p className="mb-6 text-gray-300">
          GildedBit is at the forefront of digital gold investment, merging the timeless value of gold 
          with modern technology. Our platform offers a secure, efficient, and accessible 
          way to buy, sell, and invest in digital gold, bringing the stability of gold to the digital age.
        </p>

        <h3 className="text-2xl font-semibold mb-4 text-yellow-500">Our Features</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <FeatureCard 
            icon={<Shield className="w-8 h-8 text-yellow-500" />}
            title="Robust Security"
            description="Advanced security measures to ensure safe and transparent transactions."
          />
          <FeatureCard 
            icon={<CreditCard className="w-8 h-8 text-yellow-500" />}
            title="Seamless Transactions"
            description="Buy and sell digital gold with ease using multiple payment options."
          />
          <FeatureCard 
            icon={<TrendingUp className="w-8 h-8 text-yellow-500" />}
            title="Real-time Market Rates"
            description="Access up-to-the-minute gold rates for informed investment decisions."
          />
          <FeatureCard 
            icon={<DollarSign className="w-8 h-8 text-yellow-500" />}
            title="Competitive Pricing"
            description="Enjoy some of the most competitive rates in the digital gold market."
          />
        </div>

        <h3 className="text-2xl font-semibold mb-4 text-yellow-500">Why Choose GildedBit?</h3>
        
        <ul className="list-disc list-inside mb-6 text-gray-300">
          <li>Fully digital platform - trade gold anytime, anywhere</li>
          <li>Transparent transactions with no hidden fees</li>
          <li>Backed by physical gold stored in secure, audited vaults(Not Working)</li>
          <li>Expert team with deep knowledge of gold markets and digital technologies</li>
          <li>Regular security audits and compliance checks for your peace of mind</li>
          <li>Reliable data management using PostgreSQL for consistent and accurate records</li>
        </ul>

        <h3 className="text-2xl font-semibold mb-4 text-yellow-500">Our Mission</h3>
        
        <p className="mb-6 text-gray-300">
          At GildedBit, we're on a mission to revolutionize gold investment by making it accessible to everyone 
          in the digital world. We believe in combining the historical stability of gold with modern technology, 
          creating a secure and efficient platform for the modern investor.
        </p>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2 text-yellow-500">Join the Digital Gold Revolution</h3>
          <p className="text-gray-300 mb-4">
            Be part of the future of gold investment with GildedBit. Whether you're a seasoned gold investor 
            or new to the market, our platform provides the tools and resources you need to succeed in the 
            world of digital gold.
          </p>
          <button className="bg-yellow-500 text-black font-bold py-2 px-4 rounded">
            Create Your GildedBit Account
          </button>
        </div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-[#003566] p-4 rounded-lg">
    <div className="flex items-center mb-2">
      {icon}
      <h4 className="text-lg font-semibold ml-2">{title}</h4>
    </div>
    <p className="text-gray-300">{description}</p>
  </div>
);

export default AboutPage;